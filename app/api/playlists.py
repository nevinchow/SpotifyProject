from flask import Blueprint, jsonify, request
from app.forms.add_playlist_form import PlaylistForm
# from flask_login import login_required
from app.models import Playlist,db



playlist_routes = Blueprint('playlist_routes', __name__)


@playlist_routes.route('/user/<int:id>', methods=['GET'])
# @login_required
def all_playlists(id):
    print("in route")
    playlists = Playlist.query.filter(Playlist.userId == id).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route('/<int:id>', methods=['GET'])
# @login_required
def playlist(id):
    playlist = Playlist.query.get(id)
    return playlist.to_dict()

@playlist_routes.route('/add', methods=['POST'])
# @login_required
def add_playlist():
    
    if request.method == "POST":
        form = PlaylistForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = Playlist()
            form.populate_obj(data)
            db.session.add(data)
            db.session.commit()
        return data.to_dict()
