import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du peuplement de la base de données...');
  
  // 1. Création des utilisateurs
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await hash(`password${i}`, 10);
    const user = await prisma.user.create({
      data: {
        userName: `User${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword
      }
    });
    users.push(user);
  }
  console.log('✓ Utilisateurs créés');

  // 2. Création des catégories
  const categories = [];
  const categoryNames = [
    'Remèdes traditionnels',
    'Phytothérapie',
    'Aromathérapie',
    'Médecine ayurvédique',
    'Médecine chinoise',
    'Homéopathie',
    'Remèdes à base de miel',
    'Remèdes anti-inflammatoires',
    'Remèdes digestifs',
    'Remèdes pour le sommeil'
  ];
  
  for (let i = 0; i < 10; i++) {
    const category = await prisma.category.create({
      data: {
        name: categoryNames[i]
      }
    });
    categories.push(category);
  }
  console.log('✓ Catégories créées');

  // 3. Création des ingrédients
  const ingredients = [];
  const ingredientNames = [
    'Miel',
    'Gingembre',
    'Curcuma',
    'Ail',
    'Menthe',
    'Lavande',
    'Camomille',
    'Citron',
    'Cannelle',
    'Thym'
  ];
  
  const ingredientDescriptions = [
    'Le miel est connu pour ses propriétés antibactériennes et apaisantes.',
    'Le gingembre est un anti-inflammatoire naturel qui aide à combattre les nausées.',
    'Le curcuma a des propriétés anti-inflammatoires et antioxydantes puissantes.',
    'L\'ail est antibactérien et renforce le système immunitaire.',
    'La menthe favorise la digestion et soulage les maux de tête.',
    'La lavande a des propriétés calmantes et favorise le sommeil.',
    'La camomille apaise le système nerveux et aide à combattre l\'insomnie.',
    'Le citron est riche en vitamine C et renforce l\'immunité.',
    'La cannelle aide à réguler la glycémie et a des propriétés anti-inflammatoires.',
    'Le thym a des propriétés antiseptiques et expectorantes.'
  ];
  
  for (let i = 0; i < 10; i++) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: ingredientNames[i],
        description: ingredientDescriptions[i]
      }
    });
    ingredients.push(ingredient);
  }
  console.log('✓ Ingrédients créés');

  // 4. Création des maladies avec catégories
  const diseases = [];
  const diseaseNames = [
    'Rhume',
    'Grippe',
    'Maux de tête',
    'Problèmes digestifs',
    'Insomnie',
    'Inflammations',
    'Toux',
    'Constipation',
    'Allergies',
    'Stress'
  ];
  
  const diseaseDescriptions = [
    'Infection virale des voies respiratoires supérieures.',
    'Infection respiratoire aiguë causée par le virus influenza.',
    'Douleur ressentie dans la région de la tête et du cou.',
    'Troubles affectant l\'estomac et les intestins.',
    'Difficulté à s\'endormir ou à rester endormi.',
    'Réaction de protection du corps contre des agents nocifs.',
    'Réflexe d\'expulsion d\'air des voies respiratoires.',
    'Difficulté à évacuer les selles, moins de trois selles par semaine.',
    'Réaction du système immunitaire à des substances étrangères.',
    'État de tension mentale ou émotionnelle résultant de circonstances difficiles.'
  ];
  
  for (let i = 0; i < 10; i++) {
    const disease = await prisma.disease.create({
      data: {
        name: diseaseNames[i],
        description: diseaseDescriptions[i],
        categoryId: categories[i % categories.length].id
      }
    });
    diseases.push(disease);
  }
  console.log('✓ Maladies créées');

  // 5. Création des remèdes
  const remedies = [];
  const remedyNames = [
    'Infusion de gingembre au miel',
    'Thé à la menthe',
    'Sirop pour la toux à l\'ail et au miel',
    'Compresse de lavande',
    'Cataplasme au curcuma',
    'Infusion de thym',
    'Eau de citron au miel',
    'Décoction de cannelle',
    'Tisane de camomille',
    'Compresse de thym et de menthe'
  ];
  
  const remedyValues = [5, 3, 7, 4, 6, 3, 2, 5, 4, 6]; // Valeurs pour chaque remède
  
  for (let i = 0; i < 10; i++) {
    const remedy = await prisma.remedy.create({
      data: {
        name: remedyNames[i],
        description: `Description détaillée pour le remède ${remedyNames[i]}.`,
        value: remedyValues[i]
      }
    });
    remedies.push(remedy);
  }
  console.log('✓ Remèdes créés');

  // 6. Création des photos pour les ingrédients (et non les remèdes)
  const photoUrls = [
    'https://example.com/photos/miel.jpg',
    'https://example.com/photos/gingembre.jpg',
    'https://example.com/photos/curcuma.jpg',
    'https://example.com/photos/ail.jpg',
    'https://example.com/photos/menthe.jpg',
    'https://example.com/photos/lavande.jpg',
    'https://example.com/photos/camomille.jpg',
    'https://example.com/photos/citron.jpg',
    'https://example.com/photos/cannelle.jpg',
    'https://example.com/photos/thym.jpg'
  ];
  
  for (let i = 0; i < 10; i++) {
    await prisma.photo.create({
      data: {
        url: photoUrls[i],
        ingredientId: ingredients[i].id
      }
    });
  }
  console.log('✓ Photos créées');

  // 7. Création des instructions pour chaque remède
  for (let i = 0; i < remedies.length; i++) {
    const remedyId = remedies[i].id;
    
    for (let step = 1; step <= 3; step++) {
      await prisma.instruction.create({
        data: {
          remedyId,
          stepNumber: step,
          text: `Étape ${step} pour préparer ${remedyNames[i]}.`
        }
      });
    }
  }
  console.log('✓ Instructions créées');

  // 8. Association des ingrédients aux remèdes
  for (let i = 0; i < remedies.length; i++) {
    // Chaque remède a 3 ingrédients (avec chevauchement pour certains)
    const ingredientIndices = [
      i % ingredients.length,
      (i + 1) % ingredients.length,
      (i + 2) % ingredients.length
    ];
    
    for (const idx of ingredientIndices) {
      await prisma.remedyIngredient.create({
        data: {
          remedyId: remedies[i].id,
          ingredientId: ingredients[idx].id,
          quantity: `${Math.floor(Math.random() * 10) + 1} ${Math.random() > 0.5 ? 'grammes' : 'cuillères à café'}`
        }
      });
    }
  }
  console.log('✓ Associations remède-ingrédient créées');

  // 9. Association des maladies aux remèdes
  for (let i = 0; i < remedies.length; i++) {
    // Chaque remède traite 2 maladies
    const diseaseIndices = [
      i % diseases.length,
      (i + 3) % diseases.length
    ];
    
    for (const idx of diseaseIndices) {
      await prisma.remedyDisease.create({
        data: {
          remedyId: remedies[i].id,
          diseaseId: diseases[idx].id
        }
      });
    }
  }
  console.log('✓ Associations remède-maladie créées');

  console.log('Peuplement de la base de données terminé avec succès!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });