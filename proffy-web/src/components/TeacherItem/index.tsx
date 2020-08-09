import React, { useCallback } from 'react';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemPrpos {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemPrpos> = ({ teacher }) => {
  const createNewConnection = useCallback(async () => {
    await api.post('/connections', {
      user_id: teacher.id,
    });
  }, [teacher]);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Logo" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{formatValue(teacher.cost)}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
        >
          <img src={whatsappIcon} alt="Icon" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
