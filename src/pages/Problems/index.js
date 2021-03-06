import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import Item from './Item';
import Table from '~/components/Table';

import api from '~/services/api';

import { Container, Header, Content } from './styles';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function load(q = '') {
    try {
      const { data } = await api.get(`/problems`, {
        params: { q },
      });
      setProblems(data);
    } catch (err) {
      toast.error('Não foi possivel listar os dados.');
    }
  }

  const debounceSearch = useRef(_.debounce((value) => load(value), 500));
  useEffect(() => {
    const loadData = search ? () => debounceSearch.current(search) : load;
    loadData();
  }, [search]);

  return (
    <Container>
      <Header>
        <h2>Problemas na encomenda</h2>

        <div>
          <div>
            <input
              type="text"
              placeholder="Buscar por problemas"
              onChange={handleSearch}
            />
            <MdSearch color="#999999" size={22} />
          </div>
        </div>
      </Header>
      <Content>
        <Table
          thead={['Encomenda', 'Problema', 'Ações']}
          data={problems}
          item={(problem) => (
            <Item reload={load} key={problem.id} data={problem} />
          )}
        />
      </Content>
    </Container>
  );
}

export default Problems;
