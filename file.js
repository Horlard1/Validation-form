// Get the form 
const form = document.querySelector('#myform');

//Submitting the form
form.addEventListener('submit', (e)=>{

    //Prevent actual submit
    e.preventDefault();

    //Gets the input fields
    const firstname = form['name'].value,
        email = form['email'].value,
        password = form['password'].value,
        password2 = form['password2'].value;

    // Check for validity
    let newName = firstname === '' ? displayErr('name', `${form['name']['name'].charAt(0).toUpperCase() + form['name']['name'].slice(1) } is required`) : clearErr('name', firstname);

    let newEmail = email === '' ? displayErr('email', `${form['email']['name'].charAt(0).toUpperCase() + form['email']['name'].slice(1) } is required`) : !validateEmail(email)? displayErr('email', 'Email is not valid'): clearErr('email', email);

    let newPass = password === '' ? displayErr('password', `${form['password']['name'].charAt(0).toUpperCase() + form['password']['name'].slice(1) } is required`) : password.length < 6? displayErr('password', 'Password must be 6 or more characters'): clearErr('password', password);

    let newPass2 = password2 === '' ? displayErr('password2', 'Password is required') : password2 !== password? displayErr('password2', 'Password doesn\'t match'): clearErr('password2', password2);

    
    if (!newName || !newEmail || !newPass || !newPass2){
        return false
    }else{
        clearfields()
        showSubmit('Form submitted');
    }
})


function displayErr(area, message){
    const formArea = form[area].parentNode;
    const small = formArea.querySelector('small');
    const icon = formArea.querySelector('#icon');
    icon.style.opacity = '1' 
    small.innerHTML = message;
    small.style.opacity = '1';
    form[area].classList.add('error');  
}

function clearErr(area, message){
    const formArea = form[area].parentNode;
    const small = formArea.querySelector('small');
    const icon = formArea.querySelector('#icon');
    icon.style.opacity = '0';
    small.style.opacity = '0';
    form[area].classList.remove('error');
    return message;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

function clearfields(){
    form['name'].value = '';
    form['email'].value = '';
    form['password'].value = '';
    form['password2'].value = '';
}

function showSubmit(message){
    const msg = document.querySelector('#affirm');
    msg.innerHTML = message;
    msg.style.opacity = '1';
    setTimeout(()=>{
        const msg = document.querySelector('#affirm');
        msg.innerHTML = '';
        msg.style.opacity = '0';
    }, 2000)
}
