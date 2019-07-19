import React from 'react'
import SingleUser from './SingleUser';
import { fetchUsers } from 'helpers/LoadUser'
class ListUserById  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users : [],
    }
  }
  componentWillMount = async () => {
    const { ids } = this.props;
    const users = await fetchUsers(ids);
    if (Array.isArray(users))
      this.setState({users : users});
  }

  render()  {
    const items = [];
    const { users } = this.state;
    if (Array.isArray(users)) {
      for(const [index, user] of users.entries()) {
        items.push(<SingleUser key={index} user={user}/>)
      }
    }
    return (
      <div className="">
        {items}
      </div>
    );
  }
}

export default ListUserById;