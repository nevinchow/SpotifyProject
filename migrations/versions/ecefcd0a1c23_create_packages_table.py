"""create packages table

Revision ID: ecefcd0a1c23
Revises: ef2f8ba3efd1
Create Date: 2021-11-11 17:06:43.752131

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ecefcd0a1c23'
down_revision = 'ef2f8ba3efd1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('songs_playlists', 'songId',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('songs_playlists', 'playlistId',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('songs_playlists', 'playlistId',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('songs_playlists', 'songId',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
