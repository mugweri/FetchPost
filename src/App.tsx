import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetch('https://senexis.io/wp-json/wp/v2/posts')
      .then(info => info.json())
      .then(data => {
        if (data && data.length) {
          setRows(data as any);
        }
      })
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center" width={100}>Cost</StyledTableCell>
              <StyledTableCell align="center" width={100}>Genre</StyledTableCell>
              <StyledTableCell align="center" width={100}>Publisher</StyledTableCell>
              <StyledTableCell align="center" width={100}>Released Date</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.title.rendered}</StyledTableCell>
                <StyledTableCell align="left"><div dangerouslySetInnerHTML={{ __html: row.content.rendered }}></div></StyledTableCell>
                <StyledTableCell align="center">{row.meta.Cost}</StyledTableCell>
                <StyledTableCell align="center">{row.meta.Genre}</StyledTableCell>
                <StyledTableCell align="center">{row.meta.Publisher}</StyledTableCell>
                <StyledTableCell align="center">{row.meta['\nReleased Date']}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
