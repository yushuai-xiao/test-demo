import { render, fireEvent} from '@testing-library/vue'
import BaseButton from './BaseButton.vue'
import { test, expect } from 'vitest'

test('button click emit event', async () => {
  const { getByText, emitted } = render(BaseButton, {
    slots: {
      default: 'Submit'
    }
  })
  const button = getByText('Submit')
  await fireEvent.click(button)
  expect(emitted()).toHaveProperty('click')
})