import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('adds a new todo and clears the input', () => {
    render(<App />)

    const input = screen.getByLabelText('เพิ่มงานที่ต้องทำ')
    const addButton = screen.getByRole('button', { name: 'เพิ่ม' })

    fireEvent.change(input, { target: { value: 'อ่านหนังสือ' } })
    fireEvent.click(addButton)

    expect(screen.getByText('อ่านหนังสือ')).toBeInTheDocument()
    expect(input).toHaveValue('')
    expect(screen.getByText('1 งานที่ยังไม่เสร็จ')).toBeInTheDocument()
  })

  it('toggles todo completion and updates remaining count', () => {
    render(<App />)

    const input = screen.getByLabelText('เพิ่มงานที่ต้องทำ')
    const addButton = screen.getByRole('button', { name: 'เพิ่ม' })

    fireEvent.change(input, { target: { value: 'ออกกำลังกาย' } })
    fireEvent.click(addButton)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    const todoText = screen.getByText('ออกกำลังกาย')
    expect(todoText).toHaveClass('completed')
    expect(screen.getByText('0 งานที่ยังไม่เสร็จ')).toBeInTheDocument()
  })

  it('edits an existing todo and saves new text', () => {
    render(<App />)

    const input = screen.getByLabelText('เพิ่มงานที่ต้องทำ')
    fireEvent.change(input, { target: { value: 'ทำรายงานฉบับเก่า' } })
    fireEvent.click(screen.getByRole('button', { name: 'เพิ่ม' }))

    fireEvent.click(screen.getByRole('button', { name: 'แก้ไข' }))

    const editInput = screen.getByLabelText('แก้ไขงาน ทำรายงานฉบับเก่า')
    fireEvent.change(editInput, { target: { value: 'ทำรายงานฉบับใหม่' } })
    fireEvent.click(screen.getByRole('button', { name: 'บันทึก' }))

    expect(screen.getByText('ทำรายงานฉบับใหม่')).toBeInTheDocument()
    expect(screen.queryByText('ทำรายงานฉบับเก่า')).not.toBeInTheDocument()
  })

  it('cancels editing without changing todo text', () => {
    render(<App />)

    const input = screen.getByLabelText('เพิ่มงานที่ต้องทำ')
    fireEvent.change(input, { target: { value: 'ซักผ้า' } })
    fireEvent.click(screen.getByRole('button', { name: 'เพิ่ม' }))

    fireEvent.click(screen.getByRole('button', { name: 'แก้ไข' }))

    const editInput = screen.getByLabelText('แก้ไขงาน ซักผ้า')
    fireEvent.change(editInput, { target: { value: 'ซักผ้าและตาก' } })
    fireEvent.click(screen.getByRole('button', { name: 'ยกเลิก' }))

    expect(screen.getByText('ซักผ้า')).toBeInTheDocument()
    expect(screen.queryByText('ซักผ้าและตาก')).not.toBeInTheDocument()
  })

  it('deletes a todo item', () => {
    render(<App />)

    const input = screen.getByLabelText('เพิ่มงานที่ต้องทำ')
    fireEvent.change(input, { target: { value: 'ล้างจาน' } })
    fireEvent.click(screen.getByRole('button', { name: 'เพิ่ม' }))

    const deleteButton = screen.getByRole('button', { name: 'ลบงาน ล้างจาน' })
    fireEvent.click(deleteButton)

    expect(screen.queryByText('ล้างจาน')).not.toBeInTheDocument()
    expect(screen.getByText('ยังไม่มีรายการ เริ่มเพิ่มงานแรกได้เลย')).toBeInTheDocument()
  })
})
