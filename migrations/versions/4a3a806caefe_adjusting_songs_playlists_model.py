"""adjusting songs_playlists model

Revision ID: 4a3a806caefe
Revises: 9e843514263c
Create Date: 2021-11-08 16:04:59.461542

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a3a806caefe'
down_revision = '9e843514263c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('songs_playlists')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('songs_playlists',
    sa.Column('songId', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('playlistId', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['playlistId'], ['playlists.id'], name='songs_playlists_playlistId_fkey'),
    sa.ForeignKeyConstraint(['songId'], ['songs.id'], name='songs_playlists_songId_fkey')
    )
    # ### end Alembic commands ###
