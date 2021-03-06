import test from 'tape'
import {createDuck, extendDuck} from '../src/duck'
import {duxDefaults} from '../src/duck/schema'

test('default values for all options have not changed', (t) => {
  t.deepEqual(
    {
      stateMachinesPropName: 'states',
      validationLevel: 'CANCEL',
      consts: {},
      creators: {},
      machines: {},
      workers: {},
      selectors: {},
      queries: {},
      types: [],
      validators: {}
    },
    duxDefaults,
    'verify the defaults for several Duck options are empty objects and arrays'
  )
  t.end()
})

test('options object from the parent is accessible to the child (extended) duck', (t) => {
  const duck = createDuck({consts: {foo: 2}})
  const childDuck = extendDuck(duck, {
    initialState: ({consts}) => ({
      bar: consts.foo * 2
    })
  })
  t.equal(
    childDuck.initialState.bar,
    4,
    'the child\'s initialState had access to the parent\'s options to create a value for \'bar\''
  )
  t.end()
})

test('the parent duck instance can be used when options passed into extend() is a function', (t) => {
  const duck = createDuck({consts: {foo: 2}})
  const childDuck = extendDuck(duck, parent => ({consts: {bar: parent.consts.foo * 2}}))
  t.equal(
    childDuck.consts.bar,
    4,
    'the child options \'bar\' prop was set using the parent \'foo\' prop'
  )
  t.end()
})
