import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/table-no-data';
import TableHead from 'src/sections/table-head';
import TableEmptyRows from 'src/sections/table-empty-rows';
import TableToolbar from 'src/sections/table-toolbar';
import { emptyRows, applyFilter, getComparator } from 'src/sections/utils';
import BookingTableRow from '../booking-records-table-row';

export default function BookingRecordsView({ isStaff }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bookings/');
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Failed to fetch data');
        }
        const data = response.data;
        console.log('Fetched bookings:', data);

        const token = localStorage.getItem('token');
        const userId = JSON.parse(atob(token.split('.')[1])).id;

        let mappedData;
        if (!isStaff) {
          const filteredData = data.filter(booking => booking.user.id === userId);
          console.log('Filtered bookings for user:', filteredData);
          mappedData = filteredData.map(booking => ({
            id: booking.id,
            name: booking.user.name,
            avatarUrl: booking.user.profile_image,
            price: booking.totalPrice,
            date: booking.createdAt,
          }));
        } else {
          mappedData = data.map(booking => ({
            id: booking.id,
            name: booking.user.name,
            avatarUrl: booking.user.profile_image,
            price: booking.totalPrice,
            date: booking.createdAt,
          }));
        }
        setBookings(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookings();
  }, [isStaff]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: bookings,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Booking Records</Typography>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead
                order={order}
                orderBy={orderBy}
                rowCount={bookings.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'price', label: 'Price' },
                  { id: 'date', label: 'Date' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BookingTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      avatarUrl={row.avatarUrl}
                      price={row.price}
                      date={row.date}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, bookings.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={bookings.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

BookingRecordsView.propTypes = {
  isStaff: PropTypes.bool.isRequired,
};
