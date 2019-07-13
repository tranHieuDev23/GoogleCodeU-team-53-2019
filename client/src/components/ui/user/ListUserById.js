import React from 'react'
import GetUserById from 'components/ui/user/GetUserById.js';

class ListUserById  extends React.Component {
  render()  {
    const items = [];
    const { ids } = this.props;
    if (Array.isArray(ids)) {
      for(const [index, userId] of ids.entries()) {
        items.push(<GetUserById key={index} userId={userId}/>)
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