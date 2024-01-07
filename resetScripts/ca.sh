#!/bin/sh
github-latest() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | # Get latest release from GitHub api
    grep '"tag_name":' |                                            # Get tag line
      sed -E 's/.*"([^"]+)".*/\1/'                                    # Pluck JSON value
}
platform(){
  unameOut="$(uname -s)"
  case "${unameOut}" in
    Linux*)     unam=Linux;;
    Darwin*)    unam=Mac;;
    CYGWIN*)    unam=Cygwin;;
    MINGW*)     unam=MinGw;;
    *)          unam="UNKNOWN:${unameOut}"
  esac
  echo $unam
  
#  case "$OSTYPE" in
#  solaris*) echo "SOLARIS" ;;
#  darwin*)  echo "OSX" ;; 
#  linux*)   echo "LINUX" ;;
#  bsd*)     echo "BSD" ;;
#  msys*)    echo "WINDOWS" ;;
#  *)        echo "unknown: $OSTYPE" ;;
#  esac
}


latest(){
  case $1 in
    "Node.js") 
      echo $(github-latest nodejs/node)
      ;;
    "Java") 
      a=$(curl https://openjdk.org 2> /dev/null | grep '<td><b>Download</b> and install the <a href="projects/jdk/' 2> /dev/null)
      a=$(curl https://jdk.java.net/${a:58:-50}/ 2> /dev/null | grep -o -P '(?<=JDK).*(?=General-Availability)' 2> /dev/null)
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
    "OpenShot"
  esac
}
















zen=($( \
 zenity --list --checklist --title="Install Apps" \
 --width=720 --height=480 --separator=" " \
 --column= --column=Name --column=Version --column=Size --column=Category \
                            \
       . Node.js   20.0.0   1GB  Development\/Language     \
       . Java        20     1GB  Development\/Language     \
       . Clang      " "     1GB  Development\/Language     \
       . GCC        " "     1GB  Development\/Language     \
       . Golang     " "     1GB  Development\/Language     \
       . Python     " "     1GB  Development\/Language     \
       . Ruby       " "     1GB  Development\/Language     \
       . Wine      8.0.1    1GB   Emulation\/Software      \
       . DosBox    8.0.1    1GB   Emulation\/Software      \
       . Qemu      8.0.0    1GB    Emulation\/System       \
       . OpenShot  3.1.1    1GB         Editing            \
       . Audacity  3.2.5    1GB         Editing            \
       . GTK4      4.9.4    1GB  Development\/Library      \
       . Ninja     " "      1GB   Development\/Build       \
       . Meson     " "      1GB   Development\/Build       \
       . HTTTrack  " "      
       . lib-SSL   " " 
       . GIMP      " "
       . Snap
       . 
       
))
configurable=(5)
for i in "${zen[@]}"; do
  #if [[ " ${configurable[*]} " =~ " $i " ]]; then
  #  -$i
  #fi
  dl $i
done

















0(){
  
}
1(){

}

(
echo "10" ; sleep 1
echo "# Updating mail logs" ; sleep 1
echo "20" ; sleep 1
echo "# Resetting cron jobs" ; sleep 1
echo "50" ; sleep 1
echo "This line will just be ignored" ; sleep 1
echo "75" ; sleep 1
echo "# Rebooting system" ; sleep 1
echo "100" ; sleep 1
) |
zenity --progress \
  --title="Update System Logs" \
  --text="Scanning mail logs..." \
  --percentage=0

if [ "$?" = -1 ] ; then
        zenity --error \
          --text="Update canceled."
fi












