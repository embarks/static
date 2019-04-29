import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@mindshaft/cute-components';

const tree = {
  'Love': {
    'Affection': [
      'Adoration',
      'Fondness',
      'Liking',
      'Attraction',
      'Caring',
      'Tenderness',
      'Compassion'
    ],
    'Lust': [
      'Desire',
      'Passion',
      'Infatuation'
    ],
    'Longing': ['Longing']
  },
  'Joy': {
    'Cheerfulness': [
      'Amusement',
      'Bliss',
      'Gaiety',
      'Glee',
      'Jolliness',
      'Joviality',
      'Joy',
      'Delight',
      'Enjoyment',
      'Gladness',
      'Happiness',
      'Jubilation',
      'Elation',
      'Satisfaction',
      'Ecstasy',
      'Euphoria'
    ],
    'Zest': [
      'Amusement',
      'Bliss',
      'Gaiety',
      'Glee',
      'Jolliness',
      'Joviality',
      'Joy',
      'Delight',
      'Enjoyment',
      'Gladness',
      'Happiness',
      'Jubilation',
      'Elation',
      'Satisfaction',
      'Ecstasy',
      'Euphoria'
    ],
    'Contentment': ['Pleasure'],
    'Pride': ['Triumph'],
    'Optimism': ['Eagerness','Hope'],
    'Enthrallment': ['Enthrallment', 'Rapture'],
    'Relief': ['Relief']
  },
  'Surprise': ['Amazement', 'Astonishment'],
  'Anger': {
    'Irritability': [
      'Aggravation',
      'Agitation',
      'Annoyance',
      'Grouchy',
      'Grumpy',
      'Crosspatch'
    ],
    'Exasperation': ['Frustration'],
    'Rage': [
      'Anger',
      'Outrage',
      'Fury',
      'Wrath',
      'Hostility',
      'Ferocity',
      'Bitterness',
      'Hatred',
      'Scorn',
      'Spite',
      'Vengefulness',
      'Dislike',
      'Resentment'
    ],
    'Disgust': [
      'Revulsion',
      'Contempt',
      'Loathing'
    ],
    'Envy': ['Jealousy'],
    'Torment': ['Torment'],
  },
  'Sadness': {
    'Suffering': [
      'Agony',
      'Anguish',
      'Hurt'
    ],
    'Sadness': [
      'Depression',
      'Despair',
      'Gloom',
      'Glumness',
      'Unhappiness',
      'Grief',
      'Sorrow',
      'Woe',
      'Misery',
      'Melancholy'
    ],
    'Disappointment': [
      'Dismay',
      'Displeasure'
    ],
    'Shame': [
      'Guilt',
      'Regret',
      'Remorse'
    ],
    'Neglect': [
      'Alienation',
      'Defeatism',
      'Dejection',
      'Embarrassment',
      'Homesickness',
      'Humiliation',
      'Insecurity',
      'Insult',
      'Isolation',
      'Loneliness',
      'Rejection'
    ],
    'Sympathy': [
      'Pity',
      'Mono no aware',
      'Sympathy'
    ]
  },
  'Fear': {
    'Horror': [
      'Alarm',
      'Shock',
      'Fear',
      'Fright',
      'Horror',
      'Terror',
      'Panic',
      'Hysteria',
      'Mortification'
    ],
    'Nervousness': [
      'Anxiety',
      'Suspense',
      'Uneasiness',
      'Apprehension',
      'Worry',
      'Distress',
      'Dread'
    ]
  },
};

export function TreeOfEmotions(props) {
  function Branch(branchProps) {
    return (
      <p>
        {branchProps.leaf}
        <Collapse>
          {branchProps.children}
        </Collapse>
      </p>
    );
  }
  Branch.propTypes = {
    leaf: PropTypes.string,
    children: PropTypes.node
  };
  return Object.keys(tree).map(
    function(primaryEmotion, index) {
      const secondaryEmotions = tree[primaryEmotion];
      return (
        <Branch
          key={`secondary-${index}`}
          leaf={primaryEmotion}
        >
          {
            Array.isArray(secondaryEmotions) ?
              null :
              Object.keys(secondaryEmotions).map(
                (emotion, index) => { 
                  return (
                    <Branch 
                      key={`secondary-${index}`}
                      leaf={emotion}
                    >
                      {
                        Array.isArray(secondaryEmotions[emotion]) ?
                          secondaryEmotions[emotion].map(
                            (tertiaryEmotion, index) => <p key={`tertiary-${index}`}>{tertiaryEmotion}</p>
                          ) : null
                      }
                    </Branch>
                  );
                }
              )}
        </Branch>
      );
    }
  );
}

export default TreeOfEmotions;