# CSIT314
CSIT314 Project 2023

# Git guide

### Addition of Feature/Bug fix

1. Create a JIRA ticket for the corresponding feature/bug
2. Go to [the repos branch area](https://github.com/Rankork/CSIT314-Project/branches)
   1. Press "new branch" and select branch source as "main"
   2. Name the branch name after the JIRA ticket code e.g. trad-xxx
   3. Press create branch
3. Now on your local machine, clone the repository to a specific location, <br> **NOTE:** This requires git to be installed on your system,
   follow [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install git
   1. Open your systems command prompt and traverse to where you would like to download the repo.
   2. Run the following command on your machine, <br> `git clone https://github.com/Rankork/CSIT314-Project.git`
4. Traverse into the project directory
5. Run `git fetch`, then `git checkout main` followed by `git pull` then finally `git checkout trad-xxx`
6. Now you can begin working on the project


### Saving branch changes

* To save your changes on your branch, do the following
   1. Run `git status` to see the modified files
   2. Run `git add FILENAME` for each modified file you would like to stage
   3. Run `git commit`, begin the commit statement with "[TRAD-XXX]" followed by a brief commit message, to further explain commit, go to the next line and type there
   4. Finally run `git push`

    
### Preparing branch for merge (Rebase on-top of main)

* This is **VERY IMPORTANT**, follow it carefully
* More info: [Squashing commits](https://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html) and [rebasing](https://git-scm.com/docs/git-rebase) 
  1. Run `git fetch`, then `git checkout main` followed by `git pull`
  <br> This step is done as to update the main branch on your local machine with main on remote (Github)
  2. Run `git checkout trad-xxx`, to return to your branch
  3. Then you need to run `git log` and count how many commits you have made on your branch
  4. Now with your count of commits say **2**, run the following command
  <br> `git rebase -i HEAD~2`
  5. Now you should see your commits, for each line with a commit **EXCEPT** the first line, replace all occurrences of "pick" with "s"
  6. Save the file, and another file should open showing your commit messages, modify if needed (E.g. fix commit spelling errors) then save
  7. Run `git push -f` to finalize commit squashing
  8. Now run `git rebase -i main`, if merge conflicts appear, resolve them then run `git rebase --continue`
  9. Again run `git push -f`

    
### Creating a merge request
1. Go onto the github repo via the browser
2. Select your branch using the drop down on the left hand side
3. Press on the contribute drop down and press open a pull request
4. Inform other members of merge request and assign person to review it



     

