const correctAnswers = ['B','B','B','B'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');

form.addEventListener ('submit', e => {
    e.preventDefault(); 

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    // check answers
    userAnswers.forEach((answer, index) => {
      const currentSelectedInput =  form[`q${index + 1}`][answer === form[`q${index + 1}`][0].value ? 0 : 1];
      console.log(currentSelectedInput);
        if(answer === correctAnswers[index]){
            score+=25;
        } 
        else {
        currentSelectedInput.parentNode.classList.add('wrong-answer');
        }
     
    });

    //show result on page
    scrollTo(0,0);
    result.querySelector('span').textContent = `${score}%`;
    result.classList.remove('d-none');
    
    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = `${output}%`;
        if(output === score){
            clearInterval(timer);
        }else {
            output++;
        }
    }, 10);
})