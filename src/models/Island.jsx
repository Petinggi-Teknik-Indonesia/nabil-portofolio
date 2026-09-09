import { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { a } from "@react-spring/three"

import islandScene from "../assets/3d/island.glb"

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
    const islandRef = useRef()

    const { gl } = useThree()
    const { nodes, materials } = useGLTF(islandScene)

    // =========================
    // DRAG STATE
    // =========================

    const isDragging = useRef(false)
    const lastX = useRef(0)

    // =========================
    // INERTIA
    // =========================

    const rotationSpeed = useRef(0)

    // =========================
    // TUNING
    // =========================

    const dragSensitivity = 0.004
    const dampingFactor = 0.92

    // =========================
    // POINTER DOWN
    // =========================

    const handlePointerDown = (e) => {
        e.preventDefault()

        isDragging.current = true

        // TRUE ketika mouse/finger mulai ditekan
        setIsRotating(true)

        lastX.current = e.clientX

        // Reset inertia ketika mulai drag baru
        rotationSpeed.current = 0

        // Capture pointer
        if (e.currentTarget?.setPointerCapture) {
            e.currentTarget.setPointerCapture(e.pointerId)
        }
    }

    // =========================
    // POINTER MOVE
    // =========================

    const handlePointerMove = (e) => {
        if (!isDragging.current) return

        e.preventDefault()

        const currentX = e.clientX
        const delta = currentX - lastX.current

        const rotationDelta = delta * dragSensitivity

        islandRef.current.rotation.y += rotationDelta

        // Simpan velocity terakhir
        rotationSpeed.current = rotationDelta

        lastX.current = currentX

        // IMPORTANT:
        // Jangan pernah setIsRotating(false) di sini.
        //
        // Selama pointer masih ditekan:
        //
        // isDragging = true
        // isRotating = true
    }

    // =========================
    // POINTER UP
    // =========================

    const handlePointerUp = (e) => {
        if (!isDragging.current) return

        e.preventDefault()

        isDragging.current = false

        // BARU DI SINI berubah menjadi FALSE
        setIsRotating(false)

        if (e.currentTarget?.releasePointerCapture) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId)
            } catch {
                // Pointer capture sudah dilepas
            }
        }
    }

    // =========================
    // POINTER CANCEL
    // =========================

    const handlePointerCancel = () => {
        if (!isDragging.current) return

        isDragging.current = false

        // Browser membatalkan pointer interaction
        setIsRotating(false)
    }

    // =========================
    // KEYBOARD
    // =========================

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") {
            setIsRotating(true)

            islandRef.current.rotation.y += 0.01 * Math.PI

            rotationSpeed.current = 0.0125
        }

        if (e.key === "ArrowRight") {
            setIsRotating(true)

            islandRef.current.rotation.y -= 0.01 * Math.PI

            rotationSpeed.current = -0.0125
        }
    }

    const handleKeyUp = (e) => {
        if (
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
        ) {
            setIsRotating(false)
        }
    }

    // =========================
    // ANIMATION LOOP
    // =========================

    useFrame(() => {
        // Inertia hanya berjalan setelah
        // finger/mouse dilepas.
        if (!isDragging.current) {
            if (Math.abs(rotationSpeed.current) > 0.0001) {
                islandRef.current.rotation.y += rotationSpeed.current

                rotationSpeed.current *= dampingFactor
            } else {
                rotationSpeed.current = 0
            }
        }

        // =========================
        // NORMALIZE ROTATION
        // =========================

        const rotation = islandRef.current.rotation.y

        const normalizedRotation =
            ((rotation % (2 * Math.PI)) + 2 * Math.PI) %
            (2 * Math.PI)

        // =========================
        // CURRENT STAGE
        // =========================

        switch (true) {
            case normalizedRotation >= 5.45 &&
                normalizedRotation <= 5.85:

                setCurrentStage(4)
                break

            case normalizedRotation >= 0.85 &&
                normalizedRotation <= 1.3:

                setCurrentStage(3)
                break

            case normalizedRotation >= 2.4 &&
                normalizedRotation <= 2.6:

                setCurrentStage(2)
                break

            case normalizedRotation >= 4.25 &&
                normalizedRotation <= 4.75:

                setCurrentStage(1)
                break

            default:
                setCurrentStage(null)
        }
    })

    // =========================
    // EVENT LISTENERS
    // =========================

    useEffect(() => {
        const canvas = gl.domElement

        // VERY IMPORTANT FOR MOBILE
        // Prevent browser from interpreting
        // the drag as page scrolling.
        canvas.style.touchAction = "none"

        // Pointer down starts on canvas
        canvas.addEventListener(
            "pointerdown",
            handlePointerDown
        )

        // Move/up/cancel are attached to window
        // so the gesture remains captured.
        window.addEventListener(
            "pointermove",
            handlePointerMove
        )

        window.addEventListener(
            "pointerup",
            handlePointerUp
        )

        window.addEventListener(
            "pointercancel",
            handlePointerCancel
        )

        document.addEventListener(
            "keydown",
            handleKeyDown
        )

        document.addEventListener(
            "keyup",
            handleKeyUp
        )

        return () => {
            canvas.removeEventListener(
                "pointerdown",
                handlePointerDown
            )

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            )

            window.removeEventListener(
                "pointerup",
                handlePointerUp
            )

            window.removeEventListener(
                "pointercancel",
                handlePointerCancel
            )

            document.removeEventListener(
                "keydown",
                handleKeyDown
            )

            document.removeEventListener(
                "keyup",
                handleKeyUp
            )

            canvas.style.touchAction = ""
        }
    }, [gl])

    // =========================
    // MODEL
    // =========================

    return (
        <a.group ref={islandRef} {...props}>
            <mesh
                geometry={
                    nodes.polySurface944_tree_body_0.geometry
                }
                material={materials.PaletteMaterial001}
            />

            <mesh
                geometry={
                    nodes.polySurface945_tree1_0.geometry
                }
                material={materials.PaletteMaterial001}
            />

            <mesh
                geometry={
                    nodes.polySurface946_tree2_0.geometry
                }
                material={materials.PaletteMaterial001}
            />

            <mesh
                geometry={
                    nodes.polySurface947_tree1_0.geometry
                }
                material={materials.PaletteMaterial001}
            />

            <mesh
                geometry={
                    nodes.polySurface948_tree_body_0.geometry
                }
                material={materials.PaletteMaterial001}
            />

            <mesh
                geometry={
                    nodes.polySurface949_tree_body_0.geometry
                }
                material={materials.PaletteMaterial001}
            />

            <mesh
                geometry={
                    nodes.pCube11_rocks1_0.geometry
                }
                material={materials.PaletteMaterial001}
            />
        </a.group>
    )
}

export default Island