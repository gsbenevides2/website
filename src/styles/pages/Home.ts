import styled from 'styled-components'

export const Page = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
`

export const FirstPage = styled(Page)`
  .card {
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.sizes.borderRadius};

    width: 280px;
    height: 460px;

    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%);

    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 22px;

    div img {
      width: 125px;
      height: 125px;

      border-radius: 50%;
      background: ${props => props.theme.colors.white};
    }

    h1 {
      font-weight: 400;
      text-align: center;
    }
    button {
      background-color: ${props => props.theme.colors.seccoundary};
      border: none;
      border-radius: ${props => props.theme.sizes.borderRadius};
      outline: none !important;

      padding: 10px;
      font-size: 28pt;
      margin-top: 100px;

      display: flex;
      justify-content: center;

      transition: 2s transform, 500ms border-radius, 1s background-color;

      &:hover {
        background-color: ${props => props.theme.colors.accent};
        border-radius: 50%;
        transform: scale(1.5);
      }
    }
  }
  @media (max-height: 460px) {
    .card {
      height: 320px;
      top: 30px;
    }
    .card h1 {
      margin-bottom: 10px;
    }
    .card button {
      margin-top: 0px;
    }
  }
`

export const SeccoundPage = styled(Page)`
  padding-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .card {
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.sizes.borderRadius};

    width: 80%;
    max-width: 580px;
    padding: 22px;

    p {
      margin: 0px;
      font-size: 12pt;
      text-align: justify;
    }
  }

  .social-media,
  nav {
    padding: 0px 5px;
    margin: 22px 0px 0px 0px;
    list-style: none;
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    overflow: hidden;
    overflow-x: scroll;

    a {
      padding: 12px;
      font-size: 55pt;
      border-radius: ${props => props.theme.sizes.borderRadius};
      color: ${props => props.theme.colors.white};
      display: flex;
      flex-direction: column;
      text-decoration: none;
      align-items: center;
      transition: background-color 1s, color 2s;
      border: 3px inset transparent;
      width: 132px;
      margin-right: 12px;
      outline: none !important;
      svg .icon {
        transition: stroke 2s;
      }
      span {
        font-size: 16pt;
      }
      &:hover {
        background-color: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.black};
        border: 3px inset ${props => props.theme.colors.black};
        .icon {
          stroke: ${props => props.theme.colors.black};
        }
      }
      &.facebook:hover {
        color: #4267b2;
        border-color: #4267b2;
        .icon {
          stroke: #4267b2;
        }
      }
      &.twitter:hover {
        color: #1da1f2;
        border-color: #1da1f2;
        .icon {
          stroke: #1da1f2;
        }
      }
      &.linkedin:hover {
        color: #0072b1;
        border-color: #0072b1;
        .icon {
          stroke: #0072b1;
        }
      }
      &.instagram:hover {
        color: #e1306c;
        border-color: #e1306c;
        .icon {
          stroke: #e1306c;
        }
      }
    }
  }
  @media (min-width: 875px) {
    .social-media {
      width: 874px;
    }
  }
`
