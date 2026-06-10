import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildExhibitionNavigation,
  buildExhibitionRooms,
} from '../../lib/taedong-exhibition'

test('buildExhibitionRooms returns the five rooms in the approved narrative order', () => {
  const rooms = buildExhibitionRooms()

  assert.equal(rooms.length, 5)
  assert.deepEqual(
    rooms.map((room) => room.id),
    ['portal', 'origin', 'atelier', 'gallery', 'finale'],
  )
})

test('buildExhibitionRooms preserves the hybrid narrative split', () => {
  const rooms = buildExhibitionRooms()

  assert.deepEqual(
    rooms.map((room) => room.experience),
    ['immersive', 'immersive', 'content', 'content', 'content'],
  )
})

test('the final room is the only room with the primary brand CTA', () => {
  const rooms = buildExhibitionRooms()
  const ctaRooms = rooms.filter((room) => room.hasPrimaryCta)

  assert.equal(ctaRooms.length, 1)
  assert.equal(ctaRooms[0]?.id, 'finale')
})

test('buildExhibitionNavigation mirrors the room anchors and display labels', () => {
  const navigation = buildExhibitionNavigation()

  assert.deepEqual(navigation, [
    { id: 'portal', label: 'Propylaea' },
    { id: 'origin', label: 'Origin Hall' },
    { id: 'atelier', label: 'Atelier' },
    { id: 'gallery', label: 'Collection' },
    { id: 'finale', label: 'Finale' },
  ])
})
