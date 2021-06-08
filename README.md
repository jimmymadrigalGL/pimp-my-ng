# pimp-my-ng

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/pimp-my-ng)

This project contains a list of cards where each card is a checkbox tree.
Each tree represents a list of rules that a team must follow within a project. 
Each card is a File or Concept that groups several rules.
When 100% of the children of a rule is checked, the rule is checked automatically.

It contains a lot of recursion and a lot of custom state management, not NGRX, but a pseudo-redux nonetheless.
