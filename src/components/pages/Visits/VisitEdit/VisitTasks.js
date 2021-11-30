import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import MenuGroup from '../../../fragments/MenuGroup'
import { useVisit } from '../../../context/VisitContext'
import { useData } from '../../../context/DataContext'
import { VisitTaskOption } from '../../../fragments/VisitTaskOption'

export default function VisitTasks() {
  const { taskTypes } = useData()
  const { tasks, setTasks } = useVisit()
  const [taskOptions, setTaskOptions] = useState()

  useEffect(() => {
    const taskOptions = taskTypes.map(
      ({ id: taskTypeId, taskTypeName: taskName, price }) => {
        const task = tasks?.find((task) => task.taskName === taskName)
        const hours = task ? Math.floor(task.quantity) : 0
        const minutes = task ? (task.quantity - hours) * 60 : 0
        if (task) {
          return { ...task, selected: true, taskTypeId, minutes, hours }
        } else {
          return {
            id: uuid(),
            taskName,
            price,
            taskTypeId,
            minutes,
            hours,
          }
        }
      }
    )
    setTaskOptions(taskOptions)
  }, [tasks, taskTypes])

  const handleTaskSelect = ({ target }) => {
    const taskOption = taskOptions?.find(({ id }) => id === target.name)
    setTaskOptions((taskOptions) =>
      taskOptions.map((option) => {
        if (option.id === taskOption.id) {
          return { ...option, selected: target.checked, hours: 0, minutes: 0 }
        } else {
          return option
        }
      })
    )
    if (target.checked) {
      setTasks((tasks) => {
        return tasks?.length
          ? [...tasks, { ...taskOption, quantity: 0 }]
          : [{ ...taskOption, quantity: 0 }]
      })
    } else if (tasks?.length) {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === taskOption.id) {
            const { id } = task
            return { id, isMarkedForDeletion: true }
          } else {
            return task
          }
        })
      )
    }
  }

  const handleTime = ({ target }) => {
    const taskOption = taskOptions?.find(
      ({ id }) =>
        `${id}-hours` === target.name || `${id}-minutes` === target.name
    )

    const hours = target.name.endsWith('hours')
      ? target.value
      : taskOption.hours

    const minutes = target.name.endsWith('minutes')
      ? target.value
      : taskOption.minutes

    setTaskOptions((taskOptions) =>
      taskOptions.map((option) => {
        if (option.id === taskOption.id) {
          return { ...option, hours, minutes }
        } else {
          return option
        }
      })
    )

    const quantity = parseInt(hours) + parseInt(minutes) / 60

    setTasks((tasks = []) =>
      tasks.map((task) => {
        if (task.id === taskOption.id) {
          return { ...task, quantity }
        } else {
          return task
        }
      })
    )
  }

  return (
    <>
      {!!taskOptions?.length && (
        <MenuGroup label="Tasks:">
          {taskOptions.map((taskOption) => (
            <VisitTaskOption
              key={taskOption.taskTypeId}
              taskOption={taskOption}
              onTaskSelect={handleTaskSelect}
              onChangeTime={handleTime}
            />
          ))}
        </MenuGroup>
      )}
    </>
  )
}
