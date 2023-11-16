const data = {
  "house": {
    "kitchen": {
      "kitchen_tools": window.kitchenTools,
      "kitchen_furniture": window.kitchenFurniture
    },
    "living_room": {
      "furniture": [
        {
          "english": "sofa",
          "spanish": "sofá",
          "gender": "feminine"
        },
        {
          "english": "coffee table",
          "spanish": "mesa de centro",
          "gender": "feminine"
        }
      ],
      "decorations": [
        {
          "english": "painting",
          "spanish": "cuadro",
          "gender": "masculine"
        },
        {
          "english": "vase",
          "spanish": "jarrón",
          "gender": "feminine"
        }
      ]
    },
    "bedroom": {
      "furniture": [
        {
          "english": "bed",
          "spanish": "cama",
          "gender": "masculine"
        },
        {
          "english": "wardrobe",
          "spanish": "armario",
          "gender": "masculine"
        }
      ],
      "linen": [
        {
          "english": "pillow",
          "spanish": "almohada",
          "gender": "feminine"
        },
        {
          "english": "blanket",
          "spanish": "manta",
          "gender": "feminine"
        }
      ]
    },
    "bathroom": {
      "fixtures": [
        {
          "english": "sink",
          "spanish": "lavabo",
          "gender": "feminine"
        },
        {
          "english": "toilet",
          "spanish": "inodoro",
          "gender": "masculine"
        }
      ],
      "accessories": [
        {
          "english": "towel",
          "spanish": "toalla",
          "gender": "feminine"
        },
        {
          "english": "soap",
          "spanish": "jabón",
          "gender": "feminine"
        }
      ]
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
        const allAnswerOptions = mixedValues.splice(0,3)
        allAnswerOptions.push(answer)
        const userOptions = allAnswerOptions.sort(() => Math.random() - 0.5);
        return userOptions;
      },
    }
});
