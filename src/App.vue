<template>
  <div class="container">
    <div
      class="login"
      v-if="
        state.username === '' ||
        (state.username === null && state.password === '') ||
        state.password === null
      "
    >
      <form action="" class="login-form" v-on:submit="Login">
        <h1>Login to Chat</h1>
        <label for="username" name="username"
          >Username:
          <input
            type="text"
            v-model="inputUsername"
            id="name"
            placeholder="enter username"
            required
          />
        </label>
        <label for="password" name="password"
          >Password:<span id="opt">(optinal)</span>
          <input
            type="password"
            v-model="inputPassword"
            id="pass"
            placeholder="enter password"
  
          />
        </label>
        <button type="submit" id="login-btn">Login</button>
      </form>
    </div>

    <div class="chat-view" v-else >
      <button type="button" class="logout" @click="Logout">
        Logout
        </button>
      <div class="chat-header">
        <h1>Welcome 2 my RTC <span>{{ state.username }}</span></h1>
      </div>
      <section class="chatbox">
        <div 
        v-for="message in state.messages" :key="message.key"
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="inner-msg">
          <div class="username">{{message.username}}</div>
          <div class="content">{{message.content}}</div>
        </div>
        </div>
      </section>

      <div class="chat-input">
        <form action="" @submit.prevent="SendMsg">
          <input
            type="text"
            v-model="inputMsg"
            placeholder="Write ur msg here.."
            name="inputmessage"
          />
          <button class="sendmsg" type="submit">Send</button>
        </form>
      </div>
    </div>
    
  </div>
</template>


<script>
import { reactive, onMounted, ref } from "vue";
import db from "./db";
export default {
  setup() {
    const inputUsername = ref("");
    const inputPassword = ref("");
    const inputMsg = ref("");
    //holds our reactive states
    const state = reactive({
      username: "",
      password: "",
      messages: [],
    });
    // when user logs in
    const Login = () => {
      if (
        inputUsername.value != "" ||
        (inputUsername.value != null && inputPassword.value != "") ||
        inputPassword.value != null
      ) {
        state.username = inputUsername.value;
        state.password = inputPassword.value;
        inputUsername.value = ""; // resets the name and pass if any errors are caused
        inputPassword.value = "";
      }
    };
    // when user sends msg
    const SendMsg = () => {
     
      const msgRef = db.database().ref("messages");
      if (inputMsg.value === "" || inputMsg.value === null) {
        return; // if empty
      }
      
      const message = {
        username: state.username,
        password: state.password,
        content: inputMsg.value,
      };
      msgRef.push(message);
      inputMsg.value = "";
    };

  // everytime component gets rendered / or mounted  
   onMounted(()=>{
    const msgRef = db.database().ref("messages");
    msgRef.on('value', snapshot =>{
      const data  = snapshot.val();
      let messages = [];

      Object.keys(data).forEach(key => {
        messages.push({
          id:key,
          username: data[key].username,
          password:data[key].password,
          content:data[key].content
        });
      });
      // updating messages in the DOM
      state.messages = messages;
    })
  })

  const Logout = () => {
    state.username = ""; // removes the user name
  }
    return {
      inputUsername,
      inputPassword,
      Login,
      state,
      inputMsg,
      SendMsg,
      Logout
    };
  }
};

</script>

<style>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  overflow: hidden;
}
body {
  background: midnightblue;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  margin: 10rem auto;
  height: 25rem;
  width: 25rem;
  /* border:2px solid white; */
  text-align: center;
  position: relative;
  border-radius: 10px;
  background: rgba(126, 126, 224, 0.233);
}
.login h1 {
  padding-top: 1rem;
  font-size: 2.5rem;
  color: white;
  margin: 2rem 0;
}
.login label {
  font-size: 2rem;
  display: inline-block;
  color: orange;
}
.login input {
  padding: 5px;
  font-size: 1.2rem;
  outline: none;
  border: 1px solid orangered;
  border-radius: 20px;
  margin: 10px auto;
  height: 3rem;
  width: calc(100% - 1rem);
}
#opt{
  font-size:1.4rem;
  color:rgb(143, 219, 67);
}
.login button {
  margin-top: 1rem;
  font-size: 1.2rem;
  height: 2.2rem;
  width: 5rem;
  border-radius: 10px;
  background: orange;
  color: white;
  border: none;
}
.login button:hover {
  background: transparent;
  border: 2px solid orange;
  transform: scale(1.008);
}


/* chat view page goes here */

.logout {
  transform: translateX(35rem);
  height: 2rem;
  width: 4.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: orange;
  background: transparent;
  border: none;
}
.chat-view {
  margin:5rem auto;
  background: rgba(126, 126, 224, 0.233);
  height: 32rem;
  border-radius:10px;
  width: 40rem;
}
.chat-header {
  height: 4rem;
  border-bottom: 2px solid orange;
  font-size: 1.2rem;
  color: white;
  text-align: center;
  width: 100%;
}
.chat-header span{
  color:rgb(209, 149, 37);
}
.chatbox {
  margin: 5px;
  padding: 10px;
  height: 21rem;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(247, 243, 243);
  font-size: 1.2rem;
}
.inner-msg{
  color:black;
  font-size:1.2rem;
  padding:6px;
  margin:8px;
  border-radius:10px;
  width:fit-content;
  box-shadow:0 0 3px black;
}
.message .inner-msg{
  float:left;
  background: rgb(248, 248, 117);
  color:black;
  text-shadow:0 0 1px black;
}
.current-user .inner-msg{
  float:right;
  background:rgb(182, 238, 212);
  color:black;
  text-shadow:0 0 1px black;
}

.message .username{color:blue;}
.current-user .username{color:blue;}

.chat-input {
  margin-top: 1rem;
  height: 4rem;
  width: 100%;
}
.chat-input input {
  border: 2px solid orange;
  height: 2.6rem;
  font-size: 1.2rem;
  padding: 6px;
  width: 90%;
  outline:none;
  border-radius:20px;
  font-family: 'Times New Roman', Times, serif;
}
.chat-input button {
  height: 2.5rem;
  margin: 0 2px;
  width: 3.7rem;
  background: orange;
  border-radius:15px;
  font-size: 1.1rem;
  border: none;
}
button {
  cursor: pointer;
}

/* chat window */
/* Desktop--> Tablet */
@media screen and (max-width:645px){
  .logout {
  transform: translateX(25rem);
  height: 2rem;
  width: 4.5rem;
  font-size: 1rem;
}
  .chat-view {
  margin:5rem auto;
  height: 32rem;
  width: 30rem;
}
.chat-input input{
  height:2.6rem;
}
.chat-header {
  height: 3rem;
  font-size: 1rem;
}

.chatbox {
  height: 22rem;
  font-size: 1rem;
 }
 .inner-msg{
  font-size:1.1rem;
  padding:4px;
  margin:6px;
  border-radius:5px;
}
.chat-input button {
  height: 2rem;
  width: 2.5rem;
  border-radius:10px;
  font-size: 0.9rem;
}
}

/* Tablet --> mobile range  */

@media screen and (max-width:500px){
  .logout {
  transform: translateX(18.6rem);
  height: 2rem;
  width: 4rem;
  font-size: 0.9rem;
}
  .chat-view {
  margin:3rem auto;
  width: 23rem;
}
 .inner-msg{
  font-size:1rem;
  padding:3px;
  margin:5px;
  border-radius:5px;
}
.chat-input input{
  width:86%;
  height:2.5rem;
  border-radius: 10px;
}
.chat-input button {
  height: 2.1rem;
  border-radius:5px;
}
}

/* login window */
@media screen and (max-width: 436px) {
  .login {
    margin: 1rem auto;
    width: 20rem;
  }
  .login h1 {
    font-size: 2.5rem;
  }
  .login label {
    font-size: 1.8rem;
  }
  .login button {
    font-size: 1rem;
  }
}

</style>


