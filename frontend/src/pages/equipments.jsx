import { Helmet } from 'react-helmet-async';

import { EquipmentsView } from 'src/sections/equipments/view';

// ----------------------------------------------------------------------

export default function EquipmentsPage() {
  return (
    <>
      <Helmet>
        <title> Equipments | WolfArchery </title>
      </Helmet>

      <EquipmentsView />
    </>
  );
}
