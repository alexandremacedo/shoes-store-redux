import styled from 'styled-components';
import { darken } from 'polished';
// color:

export const Container = styled.div`
  background: #fff;
  padding: 0px;
  margin-bottom: 100px;
`;

export const Product = styled.div`
  display: flex;

  > div:first-child {
    display: flex;
    width: 70%;
    background: #ebedee;
    align-items: center;
    justify-content: center;
    img {
      width: 500px;
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 30%;

    > strong {
      font-size: 30px;
    }

    > span {
      font-size: 15px;
      margin-top: 10px;
    }

    > div {
      margin-top: 20px;
      strong {
        font-size: 18px;
      }
    }

    > button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 20px;
      display: flex;
      align-items: center;
      width: 100%;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        padding: 0 20px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 450px;

  svg {
    height: 150px;
    width: 100px;
    fill: #7159c1;
  }
`;

export const ImagesContainer = styled.div``;

export const ColorsImage = styled.ul`
  list-style: none;
  margin: 10px 0;
  > li {
    display: inline-block;
    margin-right: 10px;
    button {
      border: 0;
      border-radius: 35px;
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: flex-end;
      > div {
        position: absolute;
        background: #141419;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }
      img {
        width: 70px;
        height: 70px;
        border-radius: 35px;
      }
    }
  }
`;

export const ColorsName = styled.ul`
  list-style: none;
  margin: 10px 0;
  span {
    color: #999;
  }

  > li {
    display: inline;
    margin-right: 10px;
  }
`;

export const Sizes = styled.ul`
  list-style: none;
  margin: 10px 0;

  > li {
    display: inline-block;
    margin-right: 10px;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ebedee;
      width: 40px;
      border: 0;
      height: 40px;
      border-radius: 20px;
      color: #000;

      span {
        color: #000;
        font-size: 12px;
      }
      &:hover {
        background: ${darken(0.04, '#ebedee')};
      }
    }
  }
`;

export const Description = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1020px;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 120px;
  strong {
    font-size: 30px;
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 40px;
    > div {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding-right: 20px;
      > strong {
        font-size: 30px;
        margin-bottom: 20px;
      }
      > span {
        color: #666;
      }
    }

    img {
      width: 50%;
      padding: 30px;
      border-radius: 10px;
    }
  }
`;

export const Similar = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1020px;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 120px;
  > strong {
    font-size: 30px;
  }
`;

export const SimilarList = styled.ul`
  display: flex;

  padding-right: 10px;
  align-items: center;
  margin-top: 60px;
  flex-direction: row;
  justify-content: space-between;

  li {
    display: inline-block;
    background: #fff;
    flex-direction: row;
    img {
      align-self: center;
      max-width: 230px;
    }

    > a {
      line-height: 20px;
      color: #666;
      margin-top: 5px;
      text-decoration: none;
    }

    > span {
      font-size: 14px;
      font-weight: bold;
      margin: 5px 0 20px;
    }
  }
`;
