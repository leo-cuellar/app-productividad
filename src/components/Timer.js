import React from 'react'
import TimeControll from 'react-compound-timer'

const Timer = ({
    timer,
    toggleTimer,
    markComplete
}) => {

    const finish = (id) => {
        markComplete(id)
        toggleTimer(id)
    }

    console.log('timer', timer)

    const timeInSeconds = timer.hours * 3600000 + timer.minutes * 60000

    return (
        <div className='contentContainer'>
            <div className='timerContent'>
                <p className='timerTitle'>{timer.title}</p>
                <div className='timerDisplay'>
                    <TimeControll
                        initialTime={timeInSeconds}
                        direction="backward"
                        startImmediately={true}
                        checkpoints={[
                            {
                                time: 0,
                                callback: () => finish(timer.id),
                            }
                        ]}
                    >
                        {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
                            <div className='timerInnerDisplay'>
                                <div className='timeControll'>
                                    <div>
                                        <p className='timeControllLabel'>Horas</p>
                                        <TimeControll.Hours />
                                    </div>
                                    <div>
                                        <p className='timeControllLabel'>Minutos</p>
                                        <TimeControll.Minutes />
                                    </div>
                                    <div>
                                        <p className='timeControllLabel'>Segundos</p>
                                        <TimeControll.Seconds />
                                    </div>
                                </div>
                                <div className='timerButtons'>
                                    <button onClick={reset}>reiniciar</button>
                                    {getTimerState() === 'PAUSED' ?
                                        <button id='pause' onClick={resume}>iniciar</button>
                                        :
                                        <button id='pause' onClick={pause}>pausar</button>
                                    }
                                    <button id='finish' onClick={() => finish(timer.id)}>terminar</button>
                                </div>
                            </div>
                        )}
                    </TimeControll>
                </div>
            </div>
        </div>
    )
}

export default Timer