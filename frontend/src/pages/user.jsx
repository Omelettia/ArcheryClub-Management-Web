import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export default function UserPage({ isAdmin, isStaff }) {
  return (
    <>
      <Helmet>
        <title> User | WolfArchery </title>
      </Helmet>

      <UserView isAdmin = {isAdmin} isStaff = {isStaff} />
    </>
  );
}
UserPage.propTypes = {
  isStaff: PropTypes.bool.isRequired, 
  isAdmin: PropTypes.bool.isRequired, 
};