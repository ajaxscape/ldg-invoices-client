import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import MenuGroup from './MenuGroup'
import { useVisit } from '../context/VisitContext'
import SplitButton from './Buttons/SplitButton'
import { VisitTaskOption } from './VisitTaskOption'

export default function VisitTasks() {
  const { tasks, setTasks, taskTypes } = useVisit()
  const [options, setOptions] = useState([])
  const [taskOptions, setTaskOptions] = useState([])

  const initOptions = () => {
    const options = taskTypes
      .filter(
        ({ taskTypeName }) =>
          !tasks.find(
            (task) =>
              task?.taskType?.taskTypeName === taskTypeName &&
              !task.isMarkedForDeletion
          )
      )
      .map(({ taskTypeName: name, id }) => ({
        name,
        id,
      }))
    setOptions(options)
    const taskOptions = tasks
      .filter(({ isMarkedForDeletion }) => !isMarkedForDeletion)
      .map((task) => {
        const { quantity, taskType, isMarkedForDeletion } = task
        if (taskType && !isMarkedForDeletion) {
          const hours = Math.floor(quantity)
          const minutes = (quantity - hours) * 60
          return {
            ...task,
            hours,
            minutes,
          }
        } else {
          return { ...task }
        }
      })
    setTaskOptions(taskOptions)
  }

  useEffect(() => {
    initOptions()
  }, [])

  useEffect(() => {
    setOptions((options) =>
      options.filter(
        ({ id }) => !taskOptions.find(({ taskType }) => taskType?.id === id)
      )
    )
  }, [taskOptions])

  useEffect(() => {
    if (
      tasks.filter(({ isMarkedForDeletion }) => !isMarkedForDeletion).length !==
      taskOptions.length
    ) {
      initOptions()
    }
  }, [tasks])

  const addTask = (task) => {
    setTaskOptions((taskOptions) => [
      ...taskOptions,
      {
        ...task,
        minutes: 0,
        hours: 0,
      },
    ])
    setTasks([
      ...tasks,
      {
        ...task,
        quantity: 0,
      },
    ])
  }

  const handleOptionClick = (option) => {
    setOptions((options) => options.filter(({ id }) => id !== option.id))
    const taskType = taskTypes.find((taskType) => taskType.id === option.id)
    const id = uuid()
    if (taskType) {
      const { taskTypeName: taskName, price } = taskType
      addTask({
        id,
        taskName,
        price,
        taskType,
      })
    } else {
      addTask({
        id,
        taskName: 'Other',
        description: '',
        price: 0,
      })
    }
  }

  const handleDelete = (taskOption) => {
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

  const handleChange = ({ target }) => {
    const targetId = target.name.substr(0, target.name.lastIndexOf('-'))
    const taskOption = taskOptions?.find(({ id }) => id === targetId)

    const hours = target.name.endsWith('hours')
      ? target.value
      : taskOption.hours

    const minutes = target.name.endsWith('minutes')
      ? target.value
      : taskOption.minutes

    const description = target.name.endsWith('description')
      ? target.value
      : taskOption.description

    const price = target.name.endsWith('price')
      ? target.value
      : taskOption.price

    setTaskOptions((taskOptions) =>
      taskOptions.map((option) => {
        if (option.id === taskOption.id) {
          return { ...option, hours, minutes, description, price }
        } else {
          return option
        }
      })
    )

    const quantity = taskOption.taskType
      ? parseInt(hours) + parseInt(minutes) / 60
      : 1

    setTasks((tasks = []) => {
      return tasks.map((task) => {
        if (task.id === taskOption.id) {
          return { ...task, quantity, description, price }
        } else {
          return task
        }
      })
    })
  }

  return (
    <>
      <MenuGroup label="Tasks:">
        {taskOptions?.map((taskOption) => (
          <VisitTaskOption
            key={taskOption.id}
            taskOption={taskOption}
            onDelete={handleDelete}
            onChange={handleChange}
          />
        ))}
        <SplitButton
          options={[...options, { name: 'Other', id: '' }]}
          onClick={handleOptionClick}
        />
      </MenuGroup>
    </>
  )
}
