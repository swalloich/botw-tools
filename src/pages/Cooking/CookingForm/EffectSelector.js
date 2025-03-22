import PropTypes from 'prop-types'
import React, { useState } from 'react'

const effects = {
  'attack-up': 'Attack Up',
  'defense-up': 'Defense Up',
  'extra-stamina': 'Extra Stamina',
  'extra-hearts': 'Extra Hearts',
  'flame-guard': 'Fireproof',
  'health-restore': 'Health Restoration',
  'heat-resist': 'Heat Resistance',
  'shock-resist': 'Shock Resistance',
  'speed-up': 'Speed Up',
  'stamina-restore': 'Stamina Restoration',
  'stealth-up': 'Stealth Up'
}

export default function EffectSelector({ legend = "Desired Effect", defaultEffect, ...props }) {
  const [selectedEffect, setSelectedEffect] = useState(defaultEffect)
  return (
    <fieldset {...props}>
      <legend>{legend}</legend>
      {Object.entries(effects).map(([key, value]) => (
        <label key={key}>
          <input
            type='radio'
            name='desired-effect'
            value={key}
            checked={selectedEffect === key}
            onChange={() => setSelectedEffect(key)}
          />
          {value}
        </label>
      ))}
    </fieldset>
  )
}

EffectSelector.propTypes = {
  legend: PropTypes.string,
  defaultEffect: PropTypes.oneOf(Object.keys(effects)),
}