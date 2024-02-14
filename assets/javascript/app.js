const data = {
  "descriptive": {
    "sensory_adjectives | fa-brain": {
      "smell_adjectives | fa-nose": window.basicSmellAdjectives,
      "sight_adjectives | fa-eye": window.basicSightAdjectives,
      "sound_adjectives | fa-ear": window.basicSoundAdjectives,
      "taste_adjectives | fa-tongue": window.basicTasteAdjectives,
      "touch_adjectives | fa-hand-sparkles": window.basicTouchAdjectives,
      "temperature_adjectives | fa-thermometer-half": window.basicTemperatureAdjectives
    }
  },
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
  "books | fa-book": {
    "la_paella_loca | fa-utensils": {
      "el_avion | fa-1": window.booksLaPaellaLocaElAvion,
      "espana | fa-2": window.booksLaPaellaLocaEspana
    },
    "la_criatura | fa-dove": {
      "la_excursion | fa-1": window.booksLaCriaturaLaExcursion,
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
      "quantitive_adjectives | fa-balance-scale": window.qualitativeAdjectives,
      "sentence_starters | fa-flag-checkered": window.sentenceStarters
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
    },
    "phrases": {
      "sentance_starters | fa-comments": window.myselfSentenceStarters
    }
  },
  "education | fa-graduation-cap": {
    "nursery | fa-baby-carriage": {
      "numbers | fa-sort-numeric-up": window.educationNurseryNumbers,
      "shapes | fa-shapes": window.shapes,
      "colours | fa-droplet": window.educationNurseryColors,
      "body_parks | fa-child": window.educationNurseryBodyParts,
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
        currentQuestionIndex: 0,
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
          return items[0].replace('_', ' ')
        } else if (type === 'icon') {
          return items[1]
        }
      },
      speakInSpanish(text) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        var voices = window.speechSynthesis.getVoices();
        var spanishVoice = voices.find(voice => voice.lang === 'es-ES'); // Adjust as needed

        if (spanishVoice) {
          msg.voice = spanishVoice;
        } else {
          console.log("Spanish voice not found. Using default voice.");
        }

        msg.lang = 'es-ES'; // Fallback
        msg.onend = function(event) {
          console.log("Finished in " + event.elapsedTime + " milliseconds.");
        };

        window.speechSynthesis.speak(msg);
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
        const questionKey = questionKeys[this.currentQuestionIndex];

        // Update the current question index for the next question
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % questionKeys.length;

        this.randomQuestion = questionKey;
        this.randomAnswerValue = this.questions[questionKey]['spanish'];
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

        this.speakInSpanish(this.randomAnswerValue);

        this.showAnswer = true;
        this.message = `
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

