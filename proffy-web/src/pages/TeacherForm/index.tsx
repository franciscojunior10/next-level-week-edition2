import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [sheduleItems, setSheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = useCallback(() => {
    setSheduleItems([...sheduleItems, { week_day: 0, from: '', to: '' }]);
  }, [setSheduleItems, sheduleItems]);

  const setScheduleItemValue = useCallback(
    (possiton: number, field: string, value: string) => {
      const updateScheduleItem = sheduleItems.map((sheduleItem, index) => {
        if (index === possiton) {
          return { ...sheduleItem, [field]: value };
        }

        return sheduleItem;
      });

      setSheduleItems(updateScheduleItem);
    },
    [sheduleItems],
  );

  const handleCreateClass = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        await api.post('/classes', {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: sheduleItems,
        });

        alert('Cadastro realizado com sucesso!');

        history.push('/');
      } catch (error) {
        alert('Ocorreu um erro no cadastro!');
      }
    },
    [name, avatar, whatsapp, bio, subject, cost, sheduleItems, history],
  );

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={event => {
                setAvatar(event.target.value);
              }}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={event => {
                setWhatsapp(event.target.value);
              }}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={event => {
                setBio(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'História', label: 'História' },
                { value: 'Informática', label: 'Informática' },
                { value: 'Geografia', label: 'Geografia' },
              ]}
              value={subject}
              onChange={event => {
                setSubject(event.target.value);
              }}
            />

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={event => {
                setCost(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button onClick={addNewScheduleItem} type="button">
                + Novo horário
              </button>
            </legend>

            {sheduleItems.map((sheduleItem, index) => (
              <div key={sheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={sheduleItem.week_day}
                  onChange={event => {
                    setScheduleItemValue(index, 'week_day', event.target.value);
                  }}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '5', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={sheduleItem.from}
                  onChange={event => {
                    setScheduleItemValue(index, 'from', event.target.value);
                  }}
                />

                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={sheduleItem.to}
                  onChange={event => {
                    setScheduleItemValue(index, 'to', event.target.value);
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Warning" />
              Importtante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
