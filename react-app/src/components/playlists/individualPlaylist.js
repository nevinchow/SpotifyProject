import React, { useEffect, useState }  from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAPlaylist, getPlaylists, removePlaylist } from '../../store/playlists';
import { getSongsForPlaylist } from '../../store/playlists_songs';
import { Link, NavLink, useParams } from 'react-router-dom';
import EditPlaylists from './editPlaylist';
import { useHistory } from 'react-router';
import './playlists.css'



const PlaylistPage = () => {
  const {id} = useParams();
  const history = useHistory();
  const playlists = useSelector(state => state.playlists)
  const playlistSongs = useSelector(state => state.playlist_songs)
  const songsState = useSelector(state => state.songs)
  const eachPlaylist = []
  const eachSongId = []
  const allSongs = []
  Object.values(playlists).map((playlist) => (eachPlaylist.push(playlist)))
  Object.values(playlistSongs).map((songId) => (eachSongId.push(songId)))
  Object.values(songsState).map((song) => (allSongs.push(song)))
  const playlist = eachPlaylist.find(onePlaylist => +id === onePlaylist.id)
  const [editForm, openEditForm] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const songs = [];
  eachSongId.forEach((id) => {
    const oneSong = allSongs.find(aSong => +id === aSong.id)
    songs.push(oneSong)
  })
  const dispatch = useDispatch()
  let trackNumber = 0;
  

 useEffect(() => {
    (async() => {
      await dispatch(getPlaylists())
      await dispatch(getSongsForPlaylist(id))
      setLoaded(true);
    })();
  }, [dispatch]);

    if (!loaded) {
    return null;
  }

  const editFormOpen = () => {
      if(!editForm) {
        openEditForm(true)
      } else {
        openEditForm(false)
      }
  }

  const deletePlaylist = async () => {
    const deleted = await dispatch(removePlaylist(id));
            if(!deleted) {
              history.push(`/main`)

            }
  }


  return (
    <>
    <div className="playlist-page-container">
      <div className="image-container">
        <img className="playlist-img" src={playlist.imageURL} alt={playlist.name}/>
        <div className="playlist-details">
          <h1>{playlist.name}</h1>
          <p>{playlist.description}</p>
        </div>
        
      </div>
        <div className="playlist-options">
          <h2 className="edit-button" onClick={editFormOpen}>Edit</h2>
          <h2 className="delete-button" onClick={deletePlaylist}>Delete</h2>

        </div>
        {editForm ? 
        <EditPlaylists /> :
        <></>}
        

        <div className="song-display-container">
          <table className="song-table">
            <thead>
              <tr>
                <td className="table-label">#</td>
                <td className="table-label">Title</td>
                <td className="table-label">Duration</td>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => {
                trackNumber++
                const minutes = Math.floor(song.duration / 60)
                const seconds = (song.duration % 60)
                let newSeconds;
                let newMinutes;
                if (seconds < 10) {
                  newSeconds = `0${seconds}`
                } else {
                  newSeconds = seconds
                }
                let trackTime = ``
                if (minutes === 0 ) {
                  trackTime = `${minutes}: ${newSeconds}`
                } else {
                  trackTime = `${minutes} : ${newSeconds}`

                }
                return (
                  <tr>
                    <td>{trackNumber}</td>
                    <td>{song.name}</td>
                    <td>{trackTime}</td>
                  </tr>
                )
              })}
            </tbody>

          </table>

        </div>
    </div>
        

    </>

  );
}

export default PlaylistPage;