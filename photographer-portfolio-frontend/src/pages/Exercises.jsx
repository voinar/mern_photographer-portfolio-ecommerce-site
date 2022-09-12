import { useState } from "react";
// import { useEffect } from "react";

// const handleChange = (e) => {};

// wconst handleAdd = () => {};

const nums = [1,2,3,4,5,6,7,8,9,10,11]

const filtered = nums.filter(function(value){
    return value !== 1
})

console.log(filtered)

const Exercises = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userList, setUserList] = useState(["joe", "jim"]);
  const [removeUser, setRemoveUser] = useState("type user name");

//   const [results, setResults] = useState('')

//   const url = ''
//   useEffect(()=> {
//     const fetchContent = async () => {
//         const res = await fetch(url)
//         const fetchRes = res.json();
//         setResults(fetchRes.results)
//         console.log(results)
//     }
//     fetchContent()
//   },[])

  return (
    <div
      style={{
        marginTop: "300px",
        color: "rgb(220,220,220)",
        fontWeight: "thin",
        padding: "0 160px",
      }}
    >
      <h1>add user</h1>
      <form>
        <input
          type="text"
          required
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            // setUserList((userList) => [...userList, userName]);
          }}
        >
          Add
        </button>
        <input
          type="text"
          value={userAge}
          onChange={(e) => {
            setUserAge(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setUserAge((userAge) => [...userAge, userAge]);
          }}
        >
          Enter
        </button>
      </form>
      <div>
        Current users:{" "}
        {userList
          ? userList.map((element) => {
              return element + " ";
            })
          : "empty"}
      </div>
      <div>User age: {userAge}</div>

      <h1>remove user</h1>
      <form>
        <input
          type="text"
          value={removeUser}
          onChange={(e) => {
            setRemoveUser(e.target.value);
          }}
        />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          // setUserList(removeUser => console.log(removeUser))
          // console.log(typeof(removeUser))
            // setUserList((prevUserList) => prevUserList.filter(function(user){return user !== removeUser}))


            setUserList((prevList) => prevList.filter(function(user){return user !== removeUser}))
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default Exercises;
