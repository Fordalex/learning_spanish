const data = {
  "house | fa-house-user": {
    "kitchen | fa-utensils": {
      "kitchen_tools | fa-blender": window.kitchenTools,
      "kitchen_furniture | fa-chair": window.kitchenFurniture
    },
    "living_room | fa-couch": {
      "furniture | fa-chair-office": window.livingroomFurniture,
      "actions | fa-users": window.livingroomActions,
      "decorations | fa-paint-roller": window.livingroomDecorations,
    },
    "bedroom | fa-bed": {
      "furniture | fa-wardrobe": window.bedroomFurniture,
      "linen | fa-blanket": window.bedroomLinen,
    },
    "bathroom | fa-bath": {
      "fixtures | fa-shower": window.bathroomFixtures,
      "accessories | fa-soap": window.bathroomAccessories
    },
    "garage | fa-warehouse": {
      "fixtures | fa-tools": window.garageFixtures
    },
    "all": {
      "rooms | fa-square": window.houseRooms
    }
  },
  "nature | fa-leaf": {
    "park | fa-tree": {
      "facilities | fa-landmark": window.parkFacilities,
      "activities | fa-football": window.parkActivities,
      "wildlife | fa-dove": window.parkWildlife
    }
  },
  "restaurant | fa-utensils": {
    "menu | fa-book-open": {
      "appetizers | fa-seedling": window.menuAppetizers,
      "main_courses | fa-drumstick-bite": window.menuMainCourses,
      "desserts | fa-ice-cream": window.menuDesserts,
      "beverages | fa-coffee": window.menuBeverages
    },
    "customer_experience | fa-smile-beam": {
      "reservations | fa-calendar-check": window.customerExperienceReservations,
      "customer_service | fa-headset": window.customerExperienceCustomerService
    }
  },
  "conversations | fa-comments": {
    "food | fa-hamburger": {
      "eating | fa-utensils-alt": window.foodEatingConversations,
      "cooking | fa-blender": window.foodCookingConversations,
    },
    "travel | fa-plane": {
      "public_transport | fa-bus": window.travelPublicTransport,
    },
    "tv | fa-tv": {
      "actions | fa-play": window.tvActionsConversations,
    },
    "general | fa-globe": {
      "quantitive_adjectives | fa-balance-scale": window.qualitativeAdjectives
    }
  },
  "myself | fa-user-alt": {
    "items | fa-backpack": {
      "personal_belongings | fa-glasses": window.myselfItemsPersonalBelongings,
    },
    "emotions | fa-heartbeat": {
      "common | fa-smile": window.myselfEmotionsCommonEmotions,
    },
    "senses | fa-brain": {
      "common | fa-eye": window.myselfSensesCommonSenses
    }
  },
  "education | fa-graduation-cap": {
    "nursery | fa-baby-carriage": {
      "numbers | fa-sort-numeric-up": window.educationNurseryNumbers,
      "shapes | fa-shapes": window.shapes,
      "colours | fa-droplet": window.educationNurseryColors
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
