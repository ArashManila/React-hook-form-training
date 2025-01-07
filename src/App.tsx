import { SubmitHandler, useForm } from 'react-hook-form'
import './App.scss'
import { useEffect } from 'react';

interface Iform{
  "email":string,
  "message":string
}

function App() {

  const {register,handleSubmit,formState,reset} = useForm<Iform>({
    mode:"onChange"//будет выводить ошибку валидации-если она есть, в момент записывания чего-то в форму
  });// есть сам useForm - тут кучу всяких встроенных функций-тут надо смотреть. register- База для связи с инпутами, handlesubmit и т д
  //reset  очищает все поля формы resetField очищает конкретное поле

  const emailErrors = formState.errors["email"]?.message; // здесь мы получаем ошибки из поля емаил,точнее её текст
  const messageErrors = formState.errors["message"]?.message;

  const onSubmit:SubmitHandler<Iform> = (data) =>{
    console.log(data);
  }

  useEffect(()=>{
    reset({
      email:"test@test.ru",
      message:"message:"
    })
  },[reset])

  return (
    <>
      <h1>Vite + React</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <button type="button" onClick={()=>reset()}>Reset</button> */}
        <input type="email"
         placeholder='Enter email'
         {...register("email",{ //распаковываем register, говорим,что данное поле required, делаем ему паттерн ввода и указываем текст ошибки если не соотвествуем ему
          required:"This fiels is required",
          pattern:{
            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message:"Invalid message adress"
          }
         })}
         />
         {emailErrors && <p style={
          {
            color:"red",
            textAlign:"left"
          }
         }>{emailErrors}</p>}
        <textarea
         placeholder='Enter message'
         {...register("message",{ //распаковываем register, говорим,что данное поле required, 
          required:"This fiels is required",
         })}
         ></textarea>
          {messageErrors && <p style={
          {
            color:"red",
            textAlign:"left"
          }
         }>{messageErrors}</p>}
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
