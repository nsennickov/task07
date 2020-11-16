let user = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    email: document.getElementById('email').value
};

// Don't edit above this line
user = new Proxy(user, {
    set(target, prop, value) {
        if (prop == 'name') {
            if (value.match(nameValid)) {
                alert('Incorrect name!')
                return false
            } else {
                let arr = value.split(' ').filter(elem => { if (elem != '') return elem })
                target[prop] = arr[0][0].toUpperCase() + arr[0].slice(1).toLowerCase() + ' ' + arr[1][0].toUpperCase() + arr[1].slice(1).toLowerCase()
                return true
            }
        } else if (prop == 'age') {
            if (value.match(ageValid) || value.length > 3) {
                alert('Incorrect age!')
                return false
            } else {
                target[prop] = value;
                return true
            }
        } else if (prop == 'email') {
            if (!value.match(mailValid)) {
                alert('Incorrect email!');
                return false
            } else {
                target[prop] = value;
                return true
            }
        }
    },

})

const nameValid = /\d/gi;
const ageValid = /^[0]|\D/gi;
const mailValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

// Don't edit below this line

function edit(btn) {
    btn.innerHTML = 'save';
    btn.setAttribute('onclick', 'save(this)');
    const input = document.getElementById(btn.previousElementSibling.id);
    input.removeAttribute('disabled');
}

function save(btn) {
    btn.innerHTML = 'edit';
    btn.setAttribute('onclick', 'edit(this)');
    const input = document.getElementById(btn.previousElementSibling.id);
    input.setAttribute('disabled', 'true');
    user[input.id] = document.getElementById(input.id).value;
    document.getElementById(input.id).value = user[input.id];
}