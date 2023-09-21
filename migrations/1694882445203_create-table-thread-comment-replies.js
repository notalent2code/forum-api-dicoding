/* eslint-disable camelcase */

const TABLE_NAME = 'thread_comment_replies';
const FK_COMMENT_ID = `fk_${TABLE_NAME}.comment_id_thread_comments.id`;
const FK_OWNER = `fk_${TABLE_NAME}.owner_users.id`;

exports.up = (pgm) => {
  pgm.createTable(TABLE_NAME, {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    comment_id: { type: 'VARCHAR(50)', notNull: true },
    content: { type: 'TEXT', notNull: true },
    owner: { type: 'VARCHAR(50)', notNull: true },
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
      default: pgm.func('FALSE'),
    },
    date: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });

  pgm.addConstraint(
    TABLE_NAME,
    FK_COMMENT_ID,
    'FOREIGN KEY (comment_id) REFERENCES thread_comments (id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    TABLE_NAME,
    FK_OWNER,
    'FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable(TABLE_NAME);
};
