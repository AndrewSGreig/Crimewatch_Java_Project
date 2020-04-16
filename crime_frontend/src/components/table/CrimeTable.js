import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';





function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'featureName', numeric: false, disablePadding: true, label: 'Place' },
  { id: 'numberOfFrauds', numeric: true, disablePadding: false, label: 'Frauds' },
  { id: 'numberOfHouseBreakIns', numeric: true, disablePadding: false, label: 'House Break-ins' },
  { id: 'numberOfMotorThefts', numeric: true, disablePadding: false, label: 'Motor Thefts' },
  { id: 'numberOfNonSexualCrimesOfViolence', numeric: true, disablePadding: false, label: 'Non-sexual Crimes of Violence' },
  { id: 'numberOfSexualCrimes', numeric: true, disablePadding: false, label: 'Sexual Crimes' },
];


function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };



  return (
    <TableHead>
      <TableRow>
      <TableCell>
        <p> </p>
      </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};







const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: 800,
    align: 'center',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));



export default function CrimeTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('featureName');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const crimes = props.crimes
  const rOUkCrimeCategories = props.rOUkCrimes

  const newCrimes = [];
  for(let crimeCat in rOUkCrimeCategories){
    const crimeDomStats = (
      <li key={crimeCat} className="newCrimesLi"> {crimeCat}: {rOUkCrimeCategories[crimeCat]} </li>

    )
    newCrimes.push(crimeDomStats);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);

  };

  const isSelected = (place) => selected.indexOf(place) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, crimes.length - page * rowsPerPage);


  return (

        <div className="centered">
            <h2 className="header"> English and Welsh Crime Counts (Newcastle-Upon-Tyne Feb 2020)</h2>
            <div className="RoUK_Crime_Data">
            <ul className="newCrimes_ul"> {newCrimes}</ul>
          </div>

        <p>    </p>
        <h2 className="header">  Scottish Crime Data (2018/2019) </h2>
          <Paper className={classes.paper}>

            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={crimes.length}
                />
                <TableBody>
                  {stableSort(crimes, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((crime, index) => {
                      const isItemSelected = isSelected(crime.featureName);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover

                          key={crime.featureName}
                          selected={isItemSelected}
                        >
                          <TableCell >
                            <p> </p>
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {crime.featureName}
                          </TableCell>
                          <TableCell align="right">{crime.numberOfFrauds}</TableCell>
                          <TableCell align="right">{crime.numberOfHouseBreakIns}</TableCell>
                          <TableCell align="right">{crime.numberOfMotorThefts}</TableCell>
                          <TableCell align="right">{crime.numberOfNonSexualCrimesOfViolence}</TableCell>
                         <TableCell align="right">{crime.numberOfSexualCrimes}</TableCell>

                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
             </TableContainer>
             <TablePagination
               rowsPerPageOptions={[5, 10
    , 25]}
               component="div"
               count={crimes.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onChangePage={handleChangePage}
               onChangeRowsPerPage={handleChangeRowsPerPage}
             />
           </Paper>
           <FormControlLabel
             control={<Switch checked={dense} onChange={handleChangeDense} />}
             label="Dense padding"
           />
       </div>
   );
 }
