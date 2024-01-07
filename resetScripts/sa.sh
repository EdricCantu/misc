#!/bin/bash

function tui(){
  hgh=$(tput smso)
  nrm=$(tput sgr0)
  clr=$(tput clear)
  bel=$(tput bel)
  dim=$(tput dim)
  esc=$(printf "\u1b")
  nwl=$(echo)
  case $1 in
    "radio")
      opt=("$@")
      case $2 in
        "-n") opt=("${opt[@]:3}"); out=$3; retnum=o;;
        *) opt=("${opt[@]:2}") out=$2 ;;
      esac
      function refresh() {
        echo -ne $clr
        echo $out
        for i in "${!opt[@]}"; do 
          [[ $i -eq $sel ]] && echo -n $hgh
          echo -e ${opt[$i]} $nrm
        done
      }
      sel=0
      while true; do
        refresh $sel
        read -rsn1 # read -d'' -s -n1
        [[ $REPLY == $esc ]] && read -rsn2
        case $REPLY in
          "[A") (( sel != 0 )) && ((sel--)) || echo $bel ;;
          "[B") (( sel != ${#opt[@]}-1 )) && ((sel++)) || echo $bel ;;
          $nwl) break ;;
        esac
      done
      [ $retnum ] && export tui=$sel || export tui=${opt[sel]}
      ;;
    "checkbox") # Use "checkbox" instead of "radio" to indicate multiple selection
      opt=("$@")
      case $2 in
        "-n") opt=("${opt[@]:3}"); out=$3; retnum=o;;
        *) opt=("${opt[@]:2}") out=$2 ;;
      esac
      for i in "${!opt[@]}"; do
        i=_$i
        export $i=0
      done
      function refresh() {
        echo -ne $clr
        echo $out
        for i in "${!opt[@]}"; do
          i=_$i
          (( $i > 0 )) && echo -n $hgh #if it's selected
          i=${i:1}
          [[ $i -eq $sel ]] && echo -n $dim #if the user is over it
          echo -e ${opt[$i]} $nrm
        done
      }
      sel=0
      while true; do
        refresh $sel
        read -rsn1 # read -d'' -s -n1
        [[ $REPLY == $esc ]] && read -rsn2
        case $REPLY in
          "[A") (( sel != 0 )) && ((sel--)) || echo $bel ;;
          "[B") (( sel != ${#opt[@]}-1 )) && ((sel++)) || echo $bel ;;
          $nwl)
            (( cv = ${#opt[@]}-1 ))
            if (( cv != sel )); then 
              sel=_$sel
              (( $sel = 1 - $sel ))
              sel=${sel:1}
            else
              break
            fi
            ;;
        esac
      done
      tui=""
      for i in "${!opt[@]}"; do
        [ $retnum ] && val=$i || val=${opt[i]}
        i=_$i
        (( $i > 0 )) && tui="$tui $val" #if it's selected
      done
      export tui
      ;;
  esac
}






























#   SSSSSSSSSSSSSSS MMMMMMMM               MMMMMMMM     OOOOOOOOO          OOOOOOOOO     TTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHH     HHHHHHHHH
# SS:::::::::::::::SM:::::::M             M:::::::M   OO:::::::::OO      OO:::::::::OO   T:::::::::::::::::::::TH:::::::H     H:::::::H
#S::::::SSSSS::::::SM::::::::M           M::::::::M OO:::::::::::::OO  OO:::::::::::::OO T:::::::::::::::::::::TH:::::::H     H:::::::H
#S:::::S     SSSSSS M:::::::::M         M:::::::::MO:::::::OOO:::::::OO:::::::OOO:::::::OT:::::TT:::::::TT:::::THH::::::H     H::::::HH
#S:::::S            M::::::::::M       M::::::::::MO::::::O   O::::::OO::::::O   O::::::OTTTTTT  T:::::T  TTTTTT  H:::::H     H:::::H  
#S:::::S            M:::::::::::M     M:::::::::::MO:::::O     O:::::OO:::::O     O:::::O        T:::::T          H:::::H     H:::::H  
# S::::SSSS         M:::::::M::::M   M::::M:::::::MO:::::O     O:::::OO:::::O     O:::::O        T:::::T          H::::::HHHHH::::::H  
#  SS::::::SSSSS    M::::::M M::::M M::::M M::::::MO:::::O     O:::::OO:::::O     O:::::O        T:::::T          H:::::::::::::::::H  
#    SSS::::::::SS  M::::::M  M::::M::::M  M::::::MO:::::O     O:::::OO:::::O     O:::::O        T:::::T          H:::::::::::::::::H  
#       SSSSSS::::S M::::::M   M:::::::M   M::::::MO:::::O     O:::::OO:::::O     O:::::O        T:::::T          H::::::HHHHH::::::H  
#            S:::::SM::::::M    M:::::M    M::::::MO:::::O     O:::::OO:::::O     O:::::O        T:::::T          H:::::H     H:::::H  
#            S:::::SM::::::M     MMMMM     M::::::MO::::::O   O::::::OO::::::O   O::::::O        T:::::T          H:::::H     H:::::H  
# SSSSSS     S:::::SM::::::M               M::::::MO:::::::OOO:::::::OO:::::::OOO:::::::O      TT:::::::TT      HH::::::H     H::::::HH
#S::::::SSSSSS:::::SM::::::M               M::::::M OO:::::::::::::OO  OO:::::::::::::OO       T:::::::::T      H:::::::H     H:::::::H
#S:::::::::::::::SS M::::::M               M::::::M   OO:::::::::OO      OO:::::::::OO         T:::::::::T      H:::::::H     H:::::::H
# SSSSSSSSSSSSSSS   MMMMMMMM               MMMMMMMM     OOOOOOOOO          OOOOOOOOO           TTTTTTTTTTT      HHHHHHHHH     HHHHHHHHH


github-latest() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | # Get latest release from GitHub api
    grep '"tag_name":' |                                            # Get tag line
      sed -E 's/.*"([^"]+)".*/\1/'                                    # Pluck JSON value
}

latest(){
  case $1 in
    "Node.js") 
      echo $(github-latest nodejs/node)
      ;;
    "Java") 
      a=$(curl https://jdk.java.net/$(curl https://openjdk.org 2> /dev/null | grep -o -P '(?<=<td><b>Download<\/b> and install the <a href=\"projects\/jdk\/).*(?=\">latest open-source JDK)' 2> /dev/null)/ 2> /dev/null | grep -o -P '(?<=JDK).*(?=General-Availability)' 2> /dev/null)
      echo ${a:4}
      ;;
    "GCC")
      a=($(curl https://gfortran.meteodat.ch/download/x86_64/releases/ 2> /dev/null | grep -o -P '(?<=<a href="gcc-)[0-9]{1,}(\.[0-9]{1,}){1,}(?=\.tar.xz")' 2> /dev/null))
      echo ${a[${#a[@]}-1]}
      ;;
    "Golang")
      a=($(curl https://go.dev/dl/ 2> /dev/null | grep -o -P 'go([0-9]{1,})(\.[0-9]{1,}){0,}' 2> /dev/null | head -1))
      echo ${a[0]:2}
      ;;
    "OpenShot")
       a=$(wget -O - https://www.openshot.org/download/stable/.AppImage 2> /dev/null)
       a=${a:58}
       IFS='/' read -ra ADDR <<< $a
       echo ${ADDR[0]:1}
      ;;
    "Audacity")
      a=$(github-latest audacity/audacity)
      echo ${a:9}
      ;;
    "Python")
      echo 
  esac
}



      opt=(Node.js Python Go Java Clang GCC Ruby Ninja Meson GTK libSSL DosBox Wine Qemu HTTrack GIMP Snapcraft Flatpak Audacity OpenShot Alien FFmpeg Notepad++)
      optp=()
      
      for currentOption in optp; do
        optp[${#optp[@]}]=$(latest $currentOption)
      done
      optp[${#optp[@]}]=
      case $2 in
        "-n") opt=("${opt[@]:3}"); out=$3; retnum=o;;
        *) opt=("${opt[@]:2}") out=$2 ;;
      esac
      for i in "${!opt[@]}"; do
        i=_$i
        export $i=0
      done
      function refresh() {
        echo -ne $clr
        echo $out
        for i in "${!opt[@]}"; do
          i=_$i
          (( $i > 0 )) && echo -n $hgh #if it's selected
          i=${i:1}
          [[ $i -eq $sel ]] && echo -n $dim #if the user is over it
          echo -e ${opt[$i]} $nrm
        done
      }
      sel=0
      while true; do
        refresh $sel
        read -rsn1 # read -d'' -s -n1
        [[ $REPLY == $esc ]] && read -rsn2
        case $REPLY in
          "[A") (( sel != 0 )) && ((sel--)) || echo $bel ;;
          "[B") (( sel != ${#opt[@]}-1 )) && ((sel++)) || echo $bel ;;
          $nwl)
            (( cv = ${#opt[@]}-1 ))
            if (( cv != sel )); then 
              sel=_$sel
              (( $sel = 1 - $sel ))
              sel=${sel:1}
            else
              break
            fi
            ;;
        esac
      done
      tui=""
      for i in "${!opt[@]}"; do
        [ $retnum ] && val=$i || val=${opt[i]}
        i=_$i
        (( $i > 0 )) && tui="$tui $val" #if it's selected
      done
      export tui
      ;;
