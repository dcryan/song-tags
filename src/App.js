import { useState } from 'react';
import './App.css';
import songs from './output.json';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    marginLeft: 80,
    marginRight: 80,
  },
  text: {
    marginTop: 8,
    marginBottom: 8,
  },
  container: {
    maxHeight: "80vh",
  },
  chip: {
    marginLeft: 4,
  }
});

function App() {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let filteredSongs = songs.filter(song => {
    return song.name.toLowerCase().includes(searchString.toLowerCase()) || song.artist.toLowerCase().includes(searchString.toLowerCase());
  })

  filteredSongs = filteredSongs.sort((a, b) => a.name > b.name ? 1 : -1);

  return (
    <>

      <Grid container justify="center" alignItems="center">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField variant="outlined" type="search" className={classes.text} onChange={(e) => setSearchString(e.target.value)} />
        </Grid>
      </Grid>
      <Paper className={classes.root}>


        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Artist</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSongs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((song) => (
                <TableRow key={`${song.name}${song.artist}`}>
                  <TableCell component="th" scope="row">
                    {song.name}
                  </TableCell>
                  <TableCell align="right">{song.artist}</TableCell>
                  <TableCell align="right">{song.count}</TableCell>
                  <TableCell align="right">{song.tags.map(tag => (
                    <Chip key={tag} size="small" className={classes.chip} label={tag} />
                  ))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredSongs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default App;
