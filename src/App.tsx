import React, { useEffect, useState } from 'react';
import './App.css'

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  website: string,
  phone: string
}

const filterDataHandler = (data: User[], searchQuery: string) => {
  if(searchQuery){
    return data?.filter(user => user?.name?.toLowerCase()?.includes(searchQuery) 
    || user?.username?.toLowerCase()?.includes(searchQuery) 
    || user?.email?.toLowerCase()?.includes(searchQuery));
  }else{
    return data;
  }
}

const  App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser ,setSelectedUser] = useState<User>();
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    fetch(
      "https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((json) => {
          setUsers(json)
        })
    .catch(error => alert('Something went wrong. Please refresh the window and try again.'))
  }, []);

  const onChangeSearchQueryHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value?.toLowerCase())
  }

  const showDetailsHandler = (data: User) => {
    setSelectedUser(data)
  }

  return (
      <div className='user_list_wrapper' >
      <h3 style={{textAlign: 'center'}}>Users List</h3>

      <input className='user_input' placeholder='Search by user name or email...' name='searchQuery' onChange={onChangeSearchQueryHandler}/>

      <div className='user_list'>
      <ol >
        {filterDataHandler(users, searchQuery)?.map(user => (
          <div key={user?.id}>
            <li className='user_list_item' onClick={() => showDetailsHandler(user)}>
              <strong>{user?.name}</strong>{'   '}<span className='user_username'>{`@${user?.username}`}</span>
            </li>
            {selectedUser?.id === user?.id ? <div className='user_card_details'>
              <div><strong className='user_card_details_title'>EMAIL:</strong>{' '}<a href='javascript:void(null)'>{user?.email}</a></div>
              <div><strong className='user_card_details_title'>PHONE:</strong>{' '}<a href='javascript:void(null)'>{user?.phone}</a></div>
              <div><strong className='user_card_details_title'>WEBSITE:</strong>{' '}<a target='_blank' href={'https://' + user?.website}>{user?.website}</a></div>
            </div>: null}
          </div>
        ))
        }
      </ol>
      </div>
      </div>
  );
}

export default App;
