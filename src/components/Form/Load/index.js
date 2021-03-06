import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Container, HeaderAction } from './styles';

export default function TableLoading() {
  return (
    <Container>
      <HeaderAction>
        <Skeleton width={280} height={32} />

        <div>
          <Skeleton width={112} height={36} />
          <Skeleton width={112} height={36} />
        </div>
      </HeaderAction>

      <div>
        <Skeleton height={350} />
      </div>
    </Container>
  );
}
