import React,{Component} from 'react'
import {Carousel} from 'react-bootstrap'

export class Home extends Component{

    render(){
        return(
        <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg"
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>Привет, друг.</h3>
            <p>Хорошего тебе дня.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://www.ejin.ru/wp-content/uploads/2018/10/unicorn-copy-e1539772624602.jpg"
            alt="Second slide"
            />

            <Carousel.Caption>
            <h3>Ты пидор.</h3>
            <p>И это не обсуждается.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://mobimg.b-cdn.net/v3/fetch/4d/4d671cfe78cbb63a617875e1f6023157.jpeg"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Дай денег</h3>
            <p>Бля дай денег.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        )
    }
}