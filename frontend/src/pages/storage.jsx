import { Helmet } from 'react-helmet-async';

import { StorageView } from 'src/sections/storage/view';

// ----------------------------------------------------------------------

export default function StoragePage() {
  return (
    <>
      <Helmet>
        <title> Storage | WolfArchery </title>
      </Helmet>

      <StorageView />
    </>
  );
}