import React, { Component } from 'react'

export default class TodoInput extends Component {
    render() {
        return (
            <div>
                <input placeholder="새로운 TODO를 입력하세요"/>
                <button>등록</button>
            </div>
        )
    }
}
