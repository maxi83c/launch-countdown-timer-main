const stylesCss = document.documentElement.style
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
const hours = document.getElementById('hours');
const days = document.getElementById('days');


// Current time variables
let currentSeconds = 0;
let currentMinutes = 0;
let currentHours = 0;
let currentDays = 14;

// Time getters

const getCurrentDays = () => {
  return currentDays < 10 ? `"0${currentDays}"` : `"${currentDays}"`;
}

const getCurrentHours = () => {
  return currentHours < 10 ? `"0${currentHours}"` : `"${currentHours}"`;
}

const getCurrentMinutes = () => {
  return currentMinutes < 10 ? `"0${currentMinutes}"` : `"${currentMinutes}"`;
}

const getCurrentSeconds = () => {
  return currentSeconds < 10 ? `"0${currentSeconds}"` : `"${currentSeconds}"`;
}

const getPrevDays= () => {
  const prevDay = currentDays > 0 ? currentDays - 1 : 0;
  return prevDay < 10 ? `"0${prevDay}"` : `"${prevDay}"`;
}

const getPrevHours = () => {
  if (!hoursFinish()){
    const prevHours = currentHours > 0 ? currentHours - 1 : 23;
    return prevHours < 10 ? `"0${prevHours}"` : `"${prevHours}"`;
  }
  return '"00"';
}

const getPrevMinutes = () => {
  if (!minutesFinish()){
    const prevMinutes =  currentMinutes > 0 ? currentMinutes - 1 : 59;
    return prevMinutes < 10 ? `"0${prevMinutes}"` : `"${prevMinutes}"`;
  }    
  return '"00"';
}

const getPrevSecond = () => {
  if (!timeFinish()){
    const prevSecond = currentSeconds > 0 ? currentSeconds - 1 : 59;
    return prevSecond < 10 ? `"0${prevSecond}"` : `"${prevSecond}"`;  
  }
  return '"00"';
}

// check finish by unit time

const hoursFinish = () => {
  return currentDays === 0 && currentHours === 0;
}

const minutesFinish = () => {
  return currentDays === 0 && currentHours === 0 && currentMinutes === 0;
}

const timeFinish = () => {
  return currentDays === 0 && currentHours === 0 && currentMinutes === 0 && currentSeconds === 0;
}


// updates time variables 

const updateTime = () => {
  let newDays = currentDays;
  let newHours = currentHours;
  let newMinutes = currentMinutes;
  if (currentHours === 0 && currentMinutes === 0 && currentSeconds === 0)
    newDays = currentDays > 0 ? currentDays - 1 : 0;
  if (currentMinutes === 0 && currentSeconds === 0 && !hoursFinish())
    newHours = currentHours > 0 ? currentHours - 1 : 23;
  if (currentSeconds === 0 && !minutesFinish())
    newMinutes = currentMinutes > 0 ? currentMinutes - 1 : 59;
  if (timeFinish())
    currentSeconds = 0;
  else 
    currentSeconds = currentSeconds > 0 ? currentSeconds - 1 : 59;
  currentDays = newDays;
  currentHours = newHours;
  currentMinutes = newMinutes;
}

// set css variables values
const setCSSVariables = () =>{
  stylesCss.setProperty('--days', getCurrentDays());
  stylesCss.setProperty('--days-prev', getPrevDays());
  stylesCss.setProperty('--hours', getCurrentHours());
  stylesCss.setProperty('--hours-prev', getPrevHours());
  stylesCss.setProperty('--minutes', getCurrentMinutes());
  stylesCss.setProperty('--minutes-prev', getPrevMinutes());
  stylesCss.setProperty('--seconds', getCurrentSeconds());
  stylesCss.setProperty('--seconds-prev', getPrevSecond());
}


// check seconds animations ends
seconds.addEventListener('animationiteration', () =>{
  minutes.classList.remove('top--animate');
  hours.classList.remove('top--animate');
  days.classList.remove('top--animate');
  if (timeFinish())
    seconds.classList.remove('top--animate');
  else {
    updateTime();
    setCSSVariables();
    if (currentSeconds === 0)
      minutes.classList.add('top--animate');
    if (currentSeconds === 0 && currentMinutes === 0)
      hours.classList.add('top--animate');
    if (currentSeconds === 0 && currentMinutes === 0 && currentHours === 0)
      days.classList.add('top--animate');
  }
});

// set initial values
setCSSVariables();
seconds.classList.add('top--animate');
days.classList.add('top--animate');
