const data = {
  "house | fa-house-user": {  // Updated icon class
    "kitchen | fa-utensils": {
      "kitchen_tools | fa-blender": window.kitchenTools,  // Example icon class
      "kitchen_furniture | fa-chair": window.kitchenFurniture  // Example icon class
    },
    "living_room | fa-couch": {  // Updated icon class
      "furniture | fa-chair-office": window.livingroomFurniture,  // Example icon class
      "actions | fa-users": window.livingroomActions,  // Example icon class
      "decorations | fa-paint-roller": window.livingroomDecorations,  // Example icon class
    },
    "bedroom | fa-bed": {
      "furniture | fa-wardrobe": window.bedroomFurniture,  // Example icon class
      "linen | fa-blanket": window.bedroomLinen,  // Example icon class
    },
    "bathroom | fa-bath": {
      "fixtures | fa-shower": window.bathroomFixtures,  // Example icon class
      "accessories | fa-soap": window.bathroomAccessories  // Example icon class
    },
    "garage | fa-garage-car": {  // Updated icon class
      "fixtures | fa-tools": window.garageFixtures  // Example icon class
    }
  },
  "nature | fa-leaf": {  // Updated icon class
    "park | fa-tree": {
      "facilities | fa-bench": window.parkFacilities,  // Example icon class
      "activities | fa-football": window.parkActivities,  // Example icon class
      "wildlife | fa-dove": window.parkWildlife  // Example icon class
    }
  },
  "restaurant | fa-utensils": {
    "menu | fa-book-open": {  // Example icon class
      "appetizers | fa-seedling": window.menuAppetizers,  // Example icon class
      "main_courses | fa-drumstick-bite": window.menuMainCourses,  // Example icon class
      "desserts | fa-ice-cream": window.menuDesserts,  // Example icon class
      "beverages | fa-coffee": window.menuBeverages  // Example icon class
    },
    "customer_experience | fa-smile-beam": {  // Updated icon class
      "reservations | fa-calendar-check": window.customerExperienceReservations,  // Example icon class
      "customer_service | fa-headset": window.customerExperienceCustomerService  // Example icon class
    }
  },
  "conversations | fa-comments": {  // Updated icon class
    "food | fa-hamburger": {  // Example icon class
      "eating | fa-utensils-alt": window.foodEatingConversations,  // Example icon class
      "cooking | fa-blender": window.foodCookingConversations,  // Example icon class
    },
    "travel | fa-plane": {  // Example icon class
      "public_transport | fa-bus": window.travelPublicTransport,  // Example icon class
    },
    "tv | fa-tv": {
      "actions | fa-play": window.tvActionsConversations,  // Example icon class
    },
    "general | fa-globe": {  // Example icon class
      "quantitive_adjectives | fa-balance-scale": window.qualitativeAdjectives  // Example icon class
    }
  },
  "myself | fa-user-alt": {  // Updated icon class
    "items | fa-backpack": {  // Example icon class
      "personal_belongings | fa-glasses": window.myselfItemsPersonalBelongings,  // Example icon class
    },
    "emotions | fa-heartbeat": {  // Example icon class
      "common | fa-smile": window.myselfEmotionsCommonEmotions,  // Example icon class
    },
    "senses | fa-brain": {  // Example icon class
      "common | fa-eye": window.myselfSensesCommonSenses  // Example icon class
    }
  },
  "education | fa-graduation-cap": {
    "nursery | fa-baby-carriage": {  // Example icon class
      "numbers | fa-sort-numeric-up": window.educationNurseryNumbers,  // Example icon class
      "shapes | fa-shapes": window.shapes  // Example icon class
    }
  }
}

const app = Vue.createApp({
    data() {
      return {
        currentData: data,
        dificulty: 3,
        selectedCategory: null,
        selectedSubcategory: null,
        selectedFinalCategory: null,
        questions: [],
        answerOptions: [],
        randomQuestion: null,
        randomAnswerValue: null,
        userAnswer: null,
        correct: false,
        showAnswer: false,
        correctAnswer: null,
        message: null,
      };
    },
    methods: {
      categoryFormatter(category, type) {
        if (!category) { return }

        const items = category.split('|')

        if (type === 'word') {
          return items[0]
        } else if (type === 'icon') {
          return items[1]
        }
      },
      selectDificulty(num) {
        this.dificulty = num;
        this.answerOptions = this.extractAllValues(this.randomAnswerValue)
      },
      selectCategory(category) {
        this.resetSelection();
        this.selectedCategory = category;
      },
      selectSubcategory(subcategory) {
        this.selectedSubcategory = subcategory;
        this.selectedFinalCategory = null;
        this.questions = [];
        this.randomQuestion = null;
      },
      selectFinalCategory(finalCategory) {
        this.selectedFinalCategory = finalCategory;
        this.questions = this.currentData[this.selectedCategory][this.selectedSubcategory][finalCategory];
        this.pickRandomQuestion();
      },
      pickRandomQuestion() {
        const questionKeys = Object.keys(this.questions);
        const randomKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
        this.randomQuestion = randomKey;
        this.randomAnswerValue = this.questions[randomKey]['spanish'];
        this.answerOptions = this.extractAllValues(this.randomAnswerValue)
      },
      chooseGender(gender) {
        this.userAnswer.gender = gender;
        this.checkAnswer();
      },
      selectTranslation(translation) {
        this.userAnswer.translation = translation;
        this.checkAnswer();
      },
      checkAnswer(option) {
        this.userAnswer = option

        if (option === this.randomAnswerValue) {
          this.correct = true;
        } else {
          this.correct = false;
        }

        this.showAnswer = true;
        this.message = `
          <b>Correct Gender:</b> ${genderKey}<br>
          <b>Correct Answer:</b> ${this.correctAnswer}<br>
        `
      },
      setupNextQuestion() {
        this.pickRandomQuestion();
        this.userAnswer = { gender: null, translation: null };
        this.showAnswer = false;
        this.correct = null;
        this.message = null;
      },
      resetSelection() {
        this.selectedCategory = null;
        this.selectedSubcategory = null;
        this.selectedFinalCategory = null;
        this.questions = [];
        this.randomQuestion = null;
        this.userAnswer = { gender: null, translation: null };
        this.correct = false;
        this.showAnswer = false;
        this.message = null;
      },
      extractAllValues(answer) {
        const values = [];
        for (const roomKey in this.currentData) {
          const room = this.currentData[roomKey];
          for (const categoryKey in room) {
            const category = room[categoryKey];
            for (const itemKey in category) {
              const item = category[itemKey];

              for (const genderKey in item) {
                const spanishValue = item[genderKey]['spanish'];

                if (spanishValue !== answer) {
                  values.push(spanishValue);
                }
              }
            }
          }
        }
        const mixedValues = values.sort(() => Math.random() - 0.5);
        const allAnswerOptions = mixedValues.splice(0,this.dificulty)
        allAnswerOptions.push(answer)
        const userOptions = allAnswerOptions.sort(() => Math.random() - 0.5);
        return userOptions;
      },
    }
});
