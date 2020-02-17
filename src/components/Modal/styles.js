import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  position: fixed;
  max-width: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding-top: 30px;
  padding-bottom: 30px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);

  > button {
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 40px;
    height: 40px;
    z-index: 10;
    border-radius: 20px;
    background: ${lighten(0.2, '#141419')};
    margin-top: 10px;
    margin-right: 30px;
    right: 0;
    top: 0;
  }
`;
export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 10%;
  background: #ebedee;
`;
