#!/bin/bash

echo
echo "---------------------------------------------------------------------------------"
echo "Entering build-script"
echo "---------------------------------------------------------------------------------"
echo

echo
echo "Setting Up Resource Paths"
echo

# root/project/scripts/setup/system/services
SERVICES_DIR="$(cd "$(dirname "$0")" && pwd)"

# root/project/scripts/setup/system
SYSTEM_DIR="$(dirname "$SERVICES_DIR")"

# root/project/scripts/setup
SETUP_DIR="$(dirname "$SYSTEM_DIR")"

# root/project/scripts
SCRIPTS_DIR="$(dirname "$SETUP_DIR")"

# root/project
PROJECT_DIR="$(dirname "$SCRIPTS_DIR")"

echo
echo "Building Microservices"
echo

# Use the flags 1 and 0 below to configure the services that you want to build
# 1 = on, 0 = off
# ----------------------------------------------------------------------------------
FLUX_TYPES=1
EMISSION_TYPES=1


# -------------------------------------------------------------------------------------
# FLINT BASED
# -------------------------------------------------------------------------------------

# Flux Types
# -------------------------------------------------------------------------------------
if [ $FLUX_TYPES -eq 1 ]; then
	bash $PROJECT_DIR/services/flux-types/build.sh
fi


# Emission Types
# -------------------------------------------------------------------------------------
if [ $EMISSION_TYPES -eq 1 ]; then
	bash $PROJECT_DIR/services/emission-types/build.sh
fi


echo
echo "---------------------------------------------------------------------------------"
echo "Leaving build-script"
echo "---------------------------------------------------------------------------------"
echo