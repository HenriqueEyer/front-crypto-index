import { isValid } from '../service/validators.ts'

describe('Validate Validator', () => {
  test('Function need return true if email be valid', () => {
    expect(isValid('email', 'teste@test.com')).toBe(true)
  })

  test('Function need return false if email be invalid', () => {
    expect(isValid('email', 'testetest.com')).toBe(false)
  })

  test('Function need return false if password be invalid', () => {
    expect(isValid('password', 'aaaaaa')).toBe(false)
    expect(isValid('password', 'aaa')).toBe(false)
    expect(isValid('password', '1234567')).toBe(false)
    expect(isValid('password', '12345')).toBe(false)
  })

  test('Function need return true if password be valid', () => {
    expect(isValid('password', '123456')).toBe(true)
  })

  test('Function need return false if currency not valid', () => {
    expect(isValid('currency', '')).toBe(false)
    expect(isValid('currency', 'Eu')).toBe(false)
    expect(isValid('currency', '23')).toBe(false)
    expect(isValid('currency', 'BTC')).toBe(false)
  })

  test('Function need return true if currency is valid', () => {
    expect(isValid('currency', 'EUR')).toBe(true)
    expect(isValid('currency', 'BRL')).toBe(true)
    expect(isValid('currency', 'CAD')).toBe(true)
  })

  test('Function need return true if value is valid', () => {
    expect(isValid('value', '1')).toBe(true)
    expect(isValid('value', '2')).toBe(true)
    expect(isValid('value', '3')).toBe(true)
  })
})