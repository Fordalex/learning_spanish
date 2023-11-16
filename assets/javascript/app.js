const data = {
  "house": {
    "kitchen": {
      "kitchen_tools": {
        "spoon": {
          "masculine": null,
          "feminine": "cuchara",
          "neutral": null
        },
        "fork": {
          "masculine": "tenedor",
          "feminine": null,
          "neutral": null
        },
        "knife": {
          "masculine": "cuchillo",
          "feminine": null,
          "neutral": null
        },
        "plate": {
          "masculine": null,
          "feminine": "plato",
          "neutral": null
        }
      },
      "kitchen_furniture": {
        "table": {
          "masculine": null,
          "feminine": "mesa",
          "neutral": null
        },
        "chair": {
          "masculine": "silla",
          "feminine": null,
          "neutral": null
        }
      }
    },
    "living_room": {
      "furniture": {
        "sofa": {
          "masculine": null,
          "feminine": "sofá",
          "neutral": null
        },
        "coffee_table": {
          "masculine": null,
          "feminine": "mesa de centro",
          "neutral": null
        }
      },
      "decorations": {
        "painting": {
          "masculine": "cuadro",
          "feminine": null,
          "neutral": null
        },
        "vase": {
          "masculine": null,
          "feminine": "jarrón",
          "neutral": null
        }
      }
    },
    "bedroom": {
      "furniture": {
        "bed": {
          "masculine": "cama",
          "feminine": null,
          "neutral": null
        },
        "wardrobe": {
          "masculine": "armario",
          "feminine": null,
          "neutral": null
        }
      },
      "linen": {
        "pillow": {
          "masculine": null,
          "feminine": "almohada",
          "neutral": null
        },
        "blanket": {
          "masculine": null,
          "feminine": "manta",
          "neutral": null
        }
      }
    },
    "bathroom": {
      "fixtures": {
        "sink": {
          "masculine": null,
          "feminine": "lavabo",
          "neutral": null
        },
        "toilet": {
          "masculine": "inodoro",
          "feminine": null,
          "neutral": null
        }
      },
      "accessories": {
        "towel": {
          "masculine": null,
          "feminine": "toalla",
          "neutral": null
        },
        "soap": {
          "masculine": null,
          "feminine": "jabón",
          "neutral": null
        }
      }
    }
  }
}

const app = Vue.createApp({
    data() {
      return {
        currentData: data,
        selectedCategory: null,
        selectedSubcategory: null,
        selectedFinalCategory: null,
        questions: [],
        randomQuestion: null,
        randomValue: null,
        userAnswer: {
          gender: null,
          translation: null
        },
        correct: false,
        showAnswer: false,
        correctAnswer: null
      };
    },
    methods: {
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
        this.randomValue = this.questions[randomKey];
      },
      chooseGender(gender) {
        this.userAnswer.gender = gender;
        this.checkAnswer();
      },
      selectTranslation(translation) {
        this.userAnswer.translation = translation;
        this.checkAnswer();
      },
      checkAnswer() {
        if (this.userAnswer.gender && this.userAnswer.translation) {
          const genderKey = this.userAnswer.gender.toLowerCase();
          this.correct = this.randomValue[genderKey] === this.userAnswer.translation;
          console.log(genderKey)
          console.log(this.randomValue)
          this.correctAnswer = this.randomValue[genderKey];
          this.showAnswer = true;

          // Setup the next question after a short delay
          setTimeout(() => {
              this.setupNextQuestion();
          }, 10000); // delay of 2 seconds
        }
      },
      setupNextQuestion() {
          this.pickRandomQuestion();
          this.userAnswer = { gender: null, translation: null };
          this.showAnswer = false;
          this.correct = null;
      },
      resetSelection() {
        this.selectedCategory = null;
        this.selectedSubcategory = null;
        this.selectedFinalCategory = null;
        this.questions = [];
        this.randomQuestion = null;
        this.userAnswer = { gender: null, translation: null };
        this.correct = false;
      }
    }
});
